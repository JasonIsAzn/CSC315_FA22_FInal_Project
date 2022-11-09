import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  // all global states are declared here
  const [allOrders, setAllOrders] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [listItems, setListItems] = useState([]);

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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
