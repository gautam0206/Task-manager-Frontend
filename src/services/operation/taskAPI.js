import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { tasks } from "../apis";
import { setTasks } from "../../slices/todo";

const { CREATE_TASK, GET_TASK, UPDATE_TASK, DELETE_TASK } = tasks;

export function createTask(title, description, token) {
  return async (dispatch) => {
   
    if(!token)
      {
        toast.error("Please Login First");

        return;
      }
    try {
      const response = await apiConnector(
        "POST",
        CREATE_TASK,
        {
          title,
          description,
        },
        {
          Authorization: `Bearer${token}`,
        }
      );

      console.log("TASK CREATED RESPONSE .....", response);

      if (response.data.success === false) {
        throw new Error(response.data.message);
      }
      toast.success("Task Added");
   
      return response.data;
    } catch (error) {
      console.error("CREATE TASK API ERROR:", error);
      toast.error("Task Not Added");
    }
  };
}

export function getTask(token) {
  return async (dispatch) => {
    try {

      const response = await apiConnector("GET", GET_TASK, null, {
        Authorization: `Bearer${token}`,
      });
      console.log("GET TASK API RESPONSE............", response);
    
      // console.log("GET TASK API RESPONSE............", response.data.data);
      dispatch(setTasks(response.data.data));
    } catch (error) {
      console.log("GET TASK API ERROR............", error);
      toast.error("Failed to fetch tasks");
    }
  };
}
export function updateTask(token, todoId, updateData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "PUT",
        `${UPDATE_TASK}/${todoId}`,
        updateData,
        {
          Authorization: `Bearer${token}`,
        }
      );
      console.log("UPDATE TASK API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("UPDATE TASK API ERROR............", error);
      toast.error("Failed to update task");
    }
  };
}

export function deleteTask(token, todoId) {
  return async (dispatch) => {
    try {
     
      const response = await apiConnector(
        "DELETE",
        `${DELETE_TASK}/${todoId}`,
        null,
        {
          Authorization: `Bearer${token}`,
        }
      );
      console.log("DELETE TASK API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // Handle state update if needed, e.g., by dispatching an action
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("DELETED TASK API ERROR............", error);
      toast.error("Failed to delete task");
    }
  };
}
