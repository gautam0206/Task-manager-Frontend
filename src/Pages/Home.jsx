import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className=" container mx-auto px-4 py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Taks Manager App</h1>
      <p className="text-lg text-gray-600">Empower Your Productivity with Every Task.</p>
      <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg" onClick={()=>navigate("/task")}>Get Started</button>
    </div>

    <div className="mt-10 w-8/12 mx-auto">
  <div className="container mx-auto">
    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-lg font-semibold">Intuitive Task Management:</p>
          <p className=" text-lg text-gray-800">Seamlessly organize your tasks with an intuitive interface that allows you to create, edit, and delete tasks with ease. Prioritize your tasks and stay on top of your to-do list effortlessly.</p>
        </div>
      </div>
  </div>
</div>

<div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">How To Use</h2>
        <div className="flex justify-center items-center mt-4">
          <div className="max-w-lg bg-white rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-800">First Make an Account then use Seamlessly to create, edit, and delete tasks with ease</p>
            
          </div>
        </div>
      </div>
  </div>
);
};

export default Home
