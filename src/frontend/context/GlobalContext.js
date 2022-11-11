import React from "react";

const GlobalContext = React.createContext({
  // all global states and their setter functions go here
  allOrders: [],
  setAllOrders: () => {},
  listOrders: [],
  setListOrders: () => {},
  allItems: [],
  setAllItems: () => {},
  listItems: [],
  setListItems: () => {},
  doughs: [],
  setDoughs: () => {},
  sauces: [],
  setSauces: () => {},
  meats: [],
  setMeats: () => {},
  drizzles: [],
  setDrizzles: () => {},
  veggies: [],
  setVeggies: () => {},
  drinks: [],
  setDrinks: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  maxID: 0,
  setMaxID: () => {},
});

export default GlobalContext;
