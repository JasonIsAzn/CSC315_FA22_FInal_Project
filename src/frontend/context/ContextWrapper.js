import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  // all global states are declared here
  const [allOrders, setAllOrders] = useState([]);
  const [allItems, setAllItems] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        /* add states and their setter functions here, too*/
        allOrders,
        setAllOrders,
        allItems,
        setAllItems,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
