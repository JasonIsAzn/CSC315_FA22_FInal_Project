import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import GlobalContext from "../context/GlobalContext";

export default function Sales() {
  const { listOrders } = useContext(GlobalContext);
  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/");
  };

  // sends the user to the Server page
  const goServer = () => {
    navigate("/server");
  };

  // sends the user to the Inventory page
  const goInventory = () => {
    navigate("/inventory");
  };

  // sends the user to the Sales page
  const goSales = () => {
    navigate("/sales");
  };

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders"); // get request
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  };

  const columns = ["id", "Customer Name", "Cost", "# Toppings", "Time"];

  return (
    <div className="h-screen overflow-y-hidden">
      <div className=" w-screen flex justify-center mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Back</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goInventory}
        >
          <h1 className="">Inventory</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goSales}
        >
          Sales
        </button>

        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goServer}
        >
          Server Mode
        </button>
      </div>
      <div className="w-1/2 h-1/2 items-center justify-center">
        <MUIDataTable
          title={"Order History"}
          data={listOrders}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
