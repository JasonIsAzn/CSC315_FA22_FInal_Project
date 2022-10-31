import React from "react";

const GlobalContext = React.createContext({
  // all global states and their setter functions go here
  allOrders: null,
  setAllOrders: () => {},
  allItems: null,
  setAllItems: () => {},
});

export default GlobalContext;
