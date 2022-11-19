import React, { useEffect, Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import GlobalContext from "../../context/GlobalContext";

export default function Sales() {
  const { listOrders, allOrders } = useContext(GlobalContext);
  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/home");
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

  // MUI data table stuff
  const options = {
    filterType: "multiselect",
    responsive: "scroll",
    download: false,
    elevation: 10,
    print:false,
    viewColumns: false,
  };

  const columns = [
      {
        name: "id",
        options: {
         filter: false,
         sort: true,
        }
      },
      {
        name: "Customer Name",
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: "Cost",
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: "# Toppings",
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: "Date",
        options: {
          filter: true,
          sort: true,
        }}];

  return (
    <div className="h-screen overflow-y-hidden">
      <div className=" w-screen flex justify-center mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Home</h1>
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
      <div className="items-center justify-center px-[10%] pt-[3%] ">
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
