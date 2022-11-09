import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  // all global states are declared here

  // used to store order and item content 
  const [allOrders, setAllOrders] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [listItems, setListItems] = useState([]);

  // used for customer and server modes
  const [doughs, setDoughs] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [meats, setMeats] = useState([]);
  const [drizzles, setDrizzles] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [drinks, setDrinks] = useState([]);

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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
