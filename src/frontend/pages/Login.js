import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // sends the user to the Manager page
  const goManager = () => {
    navigate("/manager");
  };

  // sends the user to the Server page
  const goServer = () => {
    navigate("/server");
  };

  // sends the user to the Customer page
  const goCustomer = () => {
    navigate("/customer");
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <button
        className="bg-red-400 hover:bg-red-600 text-white font-bold mx-6 p-6 rounded text-4xl border-2 border-gray-600"
        onClick={goManager}
      >
        Manager
      </button>

      <button
        className="bg-red-400 hover:bg-red-600 text-white font-bold mx-6 p-6 rounded text-4xl border-2 border-gray-600"
        onClick={goServer}
      >
        Server
      </button>

      <button
        className="bg-red-400 hover:bg-red-600 text-white font-bold mx-6 p-6 rounded text-4xl border-2 border-gray-600"
        onClick={goCustomer}
      >
        Customer
      </button>
    </div>
  );
}
