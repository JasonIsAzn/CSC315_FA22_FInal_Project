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

  // sends the user to the Customer page
  const goTest = () => {
    navigate("/test");
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <div
        className="w-screen flex items-center mt-28 ml-36"
      >
        <h1 className="italic font-bold text-5xl text-[#333333] text-[#0AADF4]">Spin N' Stone</h1>
      </div>
      <div className="h-screen w-screen flex justify-center mt-16">
        <button
          className="w-1/4 h-1/2 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-4xl"
          onClick={goManager}
        >
          Manager
        </button>

        <button
          className="w-1/4 h-1/2 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-4xl"
          onClick={goServer}
        >
          Server
        </button>

        <button
          className="w-1/4 h-1/2 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-4xl"
          onClick={goCustomer}
        >
          Customer
        </button>
      </div>
    </div>
  );
}
