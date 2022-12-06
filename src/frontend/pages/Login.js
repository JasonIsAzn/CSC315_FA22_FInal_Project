import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import logo from "../assets/logo.png";

const client_id =
  "276997609841-if2htiha5o7n10ifa0ror9jsjnctuod1.apps.googleusercontent.com";

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
    setUsedOAuth,
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
      const itemData = result.data;

      // format names more appropriately
      for (let i = 0; i < itemData.length; i++) {
        itemData[i].name = formatName(itemData[i].name);
      }

      setAllItems(itemData);

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
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].type === "sauce" && itemData[i].name !== "regular") {
          sauces.push({
            label: itemData[i].name,
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "topping-meat") {
          meats.push({
            label: itemData[i].name,
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "drizzle") {
          drizzles.push({
            label: itemData[i].name,
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "topping-veggie") {
          veggies.push({
            label: itemData[i].name,
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else if (itemData[i].type === "drink") {
          drinks.push({
            label: itemData[i].name,
            value: itemData[i].id,
            price: itemData[i].price,
          });
        } else {
          doughs.push({
            label: itemData[i].name,
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
              items.add(formatName(allOIs[j].name));
              j++;
            }

            orderData[i].items = items;
            orderData[i].time_stamp = formatDate(
              String(orderData[i].time_stamp).substring(0, 10)
            );
            orderData[i].num_toppings = items.size - 3;
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

  // sends Google sign in user to home page
  const onSuccess = () => {
    navigate("/home");
    setUsedOAuth(true);
  };

  // handle sign in failure
  const onFailure = () => {};

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <img src={logo} alt="Spin 'N Stone Logo" className="mt-[-10%]" />
      <span
        id="signInButton"
        className="text-xl font-semibold mt-[3%] mb-[2%] border rounded-4xl"
      >
        <GoogleLogin
          clientId={client_id}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        />
      </span>

      <h4 className="mb-[2.5%] font-semibold w-[12%]">
        <span>or</span>
      </h4>

      <button
        className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-semibold mx-6 px-[3%] py-[1%] rounded-md text-xl"
        onClick={goHome}
      >
        Continue as Guest
      </button>
    </div>
  );
}
