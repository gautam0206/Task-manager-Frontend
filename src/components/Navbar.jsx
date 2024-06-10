import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/operation/authAPI";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
    <div className="text-2xl font-bold">
      <Link to="/">MyTodoApp</Link>
    </div>
    <div className="flex space-x-8 items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/task" className="hover:text-gray-300">
            Task
          </Link>
        </li>
      
      </ul>
      </div>
      <div className="flex space-x-4">
        {token === null ? (
          <>
            <Link to="/login">
              <button className="rounded-lg border border-gray-300 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition duration-200">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="rounded-lg border border-gray-300 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition duration-200">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <Link to="/">
            <button
              onClick={LogoutHandler}
              className="rounded-lg border border-red-500 px-4 py-2 bg-red-600 hover:bg-red-500 transition duration-200"
            >
              Logout
            </button>
          </Link>
        )}
      </div>
      
  
  </nav>
);
};
export default Navbar;
