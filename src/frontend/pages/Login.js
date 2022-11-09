import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    allItems,
    setAllItems,
    listItems,
    setListItems,
    allOrders,
    setAllOrders,
    listOrders,
    setListOrders,
    doughs,
    sauces,
    meats,
    drinks,
    veggies,
    drizzles,
    setDoughs,
    setSauces,
    setMeats,
    setDrinks,
    setVeggies,
    setDrizzles,
  } = useContext(GlobalContext);

  // bring over all data here

  // get all items
  useEffect(() => {
    axios.get("http://localhost:5001/items").then((result) => {
      setAllItems(result.data);
      const itemData = result.data;

      // setup item storage for MUI data tables
      for (let i = 0; i < itemData.length; i++) {
        let item = [];
        item.push(itemData[i].id);
        item.push(itemData[i].name);
        item.push(itemData[i].count);
        item.push(itemData[i].price);
        item.push(itemData[i].type);
        listItems.push(item);
      }

      setListItems(listItems);

      // setup item storage for server and customer pages
      if (doughs.length === 0) {
        for (let i = 0; i < itemData.length; i++) {
          if (itemData[i].type === "sauce" && itemData[i].name !== "regular") {
            sauces.push({
              label: itemData[i].name,
              id: itemData[i].id,
              price: itemData[i].price,
            });
          } else if (itemData[i].type === "topping-meat") {
            meats.push({
              label: itemData[i].name,
              id: itemData[i].id,
              price: itemData[i].price,
            });
          } else if (itemData[i].type === "drizzle") {
            drizzles.push({
              label: itemData[i].name,
              id: itemData[i].id,
              price: itemData[i].price,
            });
          } else if (itemData[i].type === "topping-veggie") {
            veggies.push({
              label: itemData[i].name,
              id: itemData[i].id,
              price: itemData[i].price,
            });
          } else if (itemData[i].type === "drink") {
            drinks.push({
              label: itemData[i].name,
              id: itemData[i].id,
              price: itemData[i].price,
            });
          } else {
            doughs.push({
              label: itemData[i].name,
              id: itemData[i].id,
              price: itemData[i].price,
            });
          }
        }

        setDoughs(doughs);
        setSauces(sauces);
        setMeats(meats);
        setDrizzles(drizzles);
        setVeggies(veggies);
        setDrinks(drinks);
      }
    });
  }, []);

  // get all orders
  useEffect(() => {
    axios.get("http://localhost:5001/orders").then((result) => {
      setAllOrders(result.data);
      const orderData = result.data;

      // setup order storage for MUI data tables
      for (let i = 0; i < orderData.length; i++) {
        let order = [];
        order.push(orderData[i].id);
        order.push(orderData[i].customer_name);
        order.push(orderData[i].total_cost);
        order.push(orderData[i].num_toppings);
        order.push(String(orderData[i].time_stamp).substring(0, 11));
        listOrders.push(order);
      }

      setListOrders(listOrders);
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
        className="bg-red-400 hover:bg-red-600 text-white font-bold mx-6 p-6 rounded text-4xl border-2 border-gray-600"
        onClick={goCustomer}
      >
        Customer
      </button>
    </div>
    </div>
  );
}
