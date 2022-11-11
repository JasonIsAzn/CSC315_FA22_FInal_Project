import React from "react";

const GlobalContext = React.createContext({
  // all global states and their setter functions go here
  allOrders: [],
  setAllOrders: () => {},
  listOrders: [],
  setListOrders: () => {},
  allItems: [],
  listOrders: [],
  setListOrders: () => {}, 
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
<<<<<<< HEAD
  selectedItems: [],
  setSelectedItems: () => {},
  maxID: 0,
  setMaxID: () => {},
=======
>>>>>>> 5dde977f11a3514193d7ed99c3774347309468a8
});

export default GlobalContext;
