import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../slices/todo";
import { createTask, updateTask } from "../services/operation/taskAPI";

const AddTodos = ({ editingTodo, setEditingTodo, setIsNew }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription(""); 
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsNew(true);
    if (title.trim() === "") return;
    if (description.trim() === "") return; 

    try {
      if (editingTodo) {
        dispatch(
          editTodo({
            _id: editingTodo._id,
            title: title,
            description: description,
          })
        );
        dispatch(
          updateTask(token, editingTodo._id, {
            _id: editingTodo._id,
            title: title,
            description: description,
          })
        );
        // console.log("printing todo item");
        // console.log(editTodo.title, " ", title);

        setEditingTodo(null); 
        // console.log("editing todo id is: ", editingTodo._id);
      } else {
        const todo = await dispatch(createTask(title, description, token));
        dispatch(addTodo(todo));
      }

      setTitle(""); 
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setTitle(""); 
    setDescription(""); 
  };
  return (
    <div>
      <p className="text-2xl mb-4">Add Todo</p>
      <form onSubmit={handleSubmit} className="space-x-3 mt-12">
        <input
          type="text"
          placeholder="Enter the title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <input
          type="textarea"
          placeholder="Enter the Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {editingTodo ? "Update Todo" : "Add Todo"}
        </button>
        {editingTodo && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTodos;
