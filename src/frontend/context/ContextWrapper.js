import React, { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  // all global states are declared here

  // stores all item and order content
  const [allOrders, setAllOrders] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [listItems, setListItems] = useState([]);

  // stores data for server and customer views
  const [doughs, setDoughs] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [meats, setMeats] = useState([]);
  const [drizzles, setDrizzles] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // stores the max order ID
  const [maxID, setMaxID] = useState(0);

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
        selectedItems,
        setSelectedItems,
        maxID,
        setMaxID,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
