const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
  }
  
  // PROFILE ENDPOINTS
  export const tasks = {
    CREATE_TASK: BASE_URL + "/createTodo",
    GET_TASK: BASE_URL + "/getTodo",
    UPDATE_TASK: BASE_URL + "/updateTodo",
    DELETE_TASK: BASE_URL + "/deleteTodo",
  }