import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { allItems, setAllItems, listItems, setListItems } =
    useContext(GlobalContext);
  // bring over all data here

  // get all items
  useEffect(() => {
    axios.get("http://localhost:5000/items").then((result) => {
      setAllItems(result.data);
      const itemData = result.data;

      for (let i = 0; i < itemData.length; i++) {
        let item = [];
        item.push(itemData[i].id);
        item.push(itemData[i].name);
        item.push(itemData[i].count);
        item.push(itemData[i].price);
        item.push(itemData[i].type);
        console.log(item);
        listItems.push(item);
      }

      setListItems(listItems);
    });
  }, []);

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

        className="w-screen flex items-center mt-28 ml-28"

      >
        <h1 className="italic font-bold text-5xl text-[#333333] text-[#0AADF4]">Spin N' Stone</h1>
      </div>
      <div className="h-screen w-screen flex justify-center mt-16">
        <button
          className="w-1/4 h-1/2 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-3xl text-4xl"
          onClick={goManager}
        >
          Manager
        </button>
        <button
          className="w-1/4 h-1/2 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-3xl text-4xl"
          onClick={goServer}
        >
          Server
        </button>

        <button
          className="w-1/4 h-1/2 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-3xl text-4xl"
          onClick={goCustomer}
        >
          Customer
        </button>
      </div>
    </div>
  );
}