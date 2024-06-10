import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo } from "../slices/todo";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { deleteTask, getTask, updateTask } from "../services/operation/taskAPI";

const ListTodo = ({ setEditingTodo }) => {
  const [expandedTodos, setExpandedTodos] = useState({});

  const toggleExpand = (todoId) => {
    setExpandedTodos((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTask(token));
  }, []);

  const deleteHandler = async (todoId) => {
    try {
      await dispatch(deleteTask(token, todoId));
      dispatch(deleteTodo(todoId));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };
  const completeHandler = async (todoId, todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await dispatch(updateTask(token, todoId, updatedTodo));
      dispatch(completeTodo(todoId)); // Update state after deletion
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl mb-4 font-bold text-gray-800">Todos</h3>
      <ul className="list-none">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          todos.map((todo) => (
            <li
              className={`mt-4 flex flex-col gap-4 justify-between items-start px-4 py-2 rounded shadow-sm ${
                todo.completed ? "bg-green-200" : "bg-red-200"
              }`}
              key={todo._id}
            >
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {todo.title}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteHandler(todo._id)}
                      className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => completeHandler(todo._id, todo)}
                      className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-full"
                      aria-label="Complete"
                    >
                      <FaCheck />
                    </button>
                  </div>
                </div>
                <p
                  className={`text-sm ${
                    todo.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </p>
              </div>
              <div className="w-full">
                <p className="text-gray-700 text-start">
                  {expandedTodos[todo._id]
                    ? todo.description
                    : truncateText(todo.description, 20)}
                </p>
                {todo.description.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleExpand(todo._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm focus:outline-none"
                  >
                    {expandedTodos[todo._id] ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListTodo;
