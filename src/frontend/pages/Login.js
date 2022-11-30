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
    setMaxID,
  } = useContext(GlobalContext);

  // HELPER FUNCTIONS START HERE //

  // makes item names more formal
  function formatName(name) {
    let result = "";
    const data = name.split("_");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i][0].toUpperCase() + data[i].substring(1);
      result += data[i] + " ";
    }

    return result.substring(0, result.length - 1);
  }

  // converts date format to ideal form
  function formatDate(date) {
    let part1 = date.substring(5);
    let part2 = date.substring(0, 4);
    let result = part1 + "-" + part2;
    return result;
  }

  // HELPER FUNCTIONS END HERE //

  // bring over all data here //

  // get all items
  useEffect(() => {
    axios.get("http://localhost:5000/item").then((result) => {
      // store all item data
      setAllItems(result.data);
      const itemData = result.data;

      // setup item storage for MUI data tables
      for (let i = 0; i < itemData.length; i++) {
        let item = [];
        item.push(itemData[i].id);
        item.push(formatName(itemData[i].name));
        item.push(itemData[i].count);
        item.push(itemData[i].price);
        item.push(itemData[i].type);
        listItems.push(item);
      }

      setListItems(listItems);

      // setup item storage for server and customer pages
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].type === "sauce" && itemData[i].name !== "regular") {
          sauces.push({
            label: formatName(itemData[i].name),
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "topping-meat") {
          meats.push({
            label: formatName(itemData[i].name),
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "drizzle") {
          drizzles.push({
            label: formatName(itemData[i].name),
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "topping-veggie") {
          veggies.push({
            label: formatName(itemData[i].name),
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "drink") {
          drinks.push({
            label: formatName(itemData[i].name),
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else {
          doughs.push({
            label: formatName(itemData[i].name),
            value: itemData[i].id,
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
    });
  }, []);

  // get all orders
  useEffect(() => {
    axios
      .get("http://localhost:5000/order")
      .then((result) => {
        // store all order data
        const orderData = result.data;

        // setup order storage for MUI data tables
        for (let i = 0; i < orderData.length; i++) {
          let order = [];
          order.push(orderData[i].id);
          order.push(orderData[i].customer_name);
          order.push(orderData[i].total_cost);
          order.push(orderData[i].num_toppings);
          order.push(
            formatDate(String(orderData[i].time_stamp).substring(0, 10))
          );
          listOrders.push(order);
        }

        setListOrders(listOrders);

        // misc. database activities
        const idList = [];
        for (let i = 0; i < orderData.length; i++) {
          idList.push(orderData[i].id);
        }
        setMaxID(Math.max(...idList));
        return orderData;
      })
      .then((orderData) => {
        // associates all orders with their items (TODO)
        axios.get("http://localhost:5000/order_item/all").then((result) => {
          const allOIs = result.data;

          let j = 0;
          for (let i = 0; i < orderData.length; i++) {
            let items = new Set();
            while (
              j < allOIs.length &&
              orderData[i].id === allOIs[j].order_id
            ) {
              items.add(allOIs[j].name);
              j++;
            }

            orderData[i].items = items;
            orderData[i].time_stamp = formatDate(
              String(orderData[i].time_stamp).substring(0, 10)
            );
          }

          setAllOrders(orderData);
        });
      });
  }, []);

  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex flex-col items-center">
      <h1 className="text-gray-500 text-3xl py-[5%]">OAuth Stuff Goes Here</h1>

      <button
        className="w-1/4 h-1/4 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-3xl text-4xl"
        onClick={goHome}
      >
        Login
      </button>
    </div>
  );
}
