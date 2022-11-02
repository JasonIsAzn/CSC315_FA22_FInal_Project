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
      <button onClick={goTest}>Test</button>
    </div>
  );
}
