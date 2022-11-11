import React, { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  // all global states are declared here

<<<<<<< HEAD
  // stores all item and order content
=======
  // used to store order and item content 
>>>>>>> 5dde977f11a3514193d7ed99c3774347309468a8
  const [allOrders, setAllOrders] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [listItems, setListItems] = useState([]);

<<<<<<< HEAD
  // stores data for server and customer views
=======
  // used for customer and server modes
>>>>>>> 5dde977f11a3514193d7ed99c3774347309468a8
  const [doughs, setDoughs] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [meats, setMeats] = useState([]);
  const [drizzles, setDrizzles] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [drinks, setDrinks] = useState([]);
<<<<<<< HEAD
  const [selectedItems, setSelectedItems] = useState([]);

  // stores the max order ID
  const [maxID, setMaxID] = useState(0);
=======
>>>>>>> 5dde977f11a3514193d7ed99c3774347309468a8

  return (
    <GlobalContext.Provider
      value={{
        /* add states and their setter functions here, too*/
        allOrders,
        setAllOrders,
        listOrders,
        setListOrders,
        allItems,
        setAllItems,
        listItems,
        setListItems,
        doughs,
        setDoughs,
        sauces,
        setSauces,
        meats,
        setMeats,
        drizzles,
        setDrizzles,
        veggies,
        setVeggies,
        drinks,
        setDrinks,
<<<<<<< HEAD
        selectedItems,
        setSelectedItems,
        maxID,
        setMaxID,
=======
>>>>>>> 5dde977f11a3514193d7ed99c3774347309468a8
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
