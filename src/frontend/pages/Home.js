import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // sends the user to the Manager page
  const goManager = () => {
    navigate("/inventory");
  };

  // sends the user to the Server page
  const goServer = () => {
    navigate("/server");
  };

  // sends the user to the Customer page
  const goCustomer = () => {
    navigate("/customer");
  };

  // sends the user back to login page
  const logout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex flex-col">
      {/* header section for logout button */}
      <div className="flex justify-end items-end pb-[10%]">
        <button
          className="w-[10%] h-[20%] bg-red-500 hover:bg-white hover:text-red-600 hover:border-red-600 hover:border-2 text-white font-bold mx-6 pb-[2.5%] pt-[1%] rounded-xl text-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* main section for POS mode buttons */}
      <div className="flex justify-center items-center">
        <button
          className="w-1/3 h-full bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 py-[10%] rounded-3xl text-4xl"
          onClick={goManager}
        >
          Manager
        </button>

        <button
          className="w-1/3 h-full bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 py-[10%] rounded-3xl text-4xl"
          onClick={goServer}
        >
          Server
        </button>

        <button
          className="w-1/3 h-full bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 py-[10%] rounded-3xl text-4xl"
          onClick={goCustomer}
        >
          Customer
        </button>
      </div>
    </div>
  );
}
