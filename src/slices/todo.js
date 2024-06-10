import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload.data);
      localStorage.setItem("todos", JSON.stringify(state.todos));
  
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    editTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id
      );
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
      }
    },

    completeTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo._id === action.payload
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, completeTodo, setTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
