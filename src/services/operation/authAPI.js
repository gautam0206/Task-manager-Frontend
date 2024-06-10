import { toast } from "react-hot-toast";

import {  setToken } from "../../slices/auth";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { SIGNUP_API, LOGIN_API } = endpoints;

export function signUp(data, navigate) {
  return async (dispatch) => {
    const { firstName, lastName, mobile, email, password } = data;
   
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        mobile,
        email,
        password,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
  
  
  };
}

export function login(data, navigate) {
  return async (dispatch) => {
    const { email, password } = data;
   

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/task");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
   
  };
}
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("todos");
    toast.success("Logged Out");
    navigate("/");
  };
}
