import React from "react";

const GlobalContext = React.createContext({
  // all global states and their setter functions go here
  allOrders: [],
  setAllOrders: () => {},
  allItems: [],
  listOrders: [],
  setListOrders: () => {}, 
  setAllItems: () => {},
  listItems: [],
  setListItems: () => {},
});

export default GlobalContext;
