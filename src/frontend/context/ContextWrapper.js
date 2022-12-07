import React, { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";

/**
 * Allows global states to be distributed and used throughout all pages/components. These states are the backbone of all our app's functionalities.
 *
 */
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
  const [prepSelectedItems, setPrepSelectedItems] = useState([]);

  // stores the max order ID
  const [maxID, setMaxID] = useState(0);

  // needed for managing popups
  const [zValue, setZValue] = useState("z-0");
  const [showItemAdder, setShowItemAdder] = useState(false);
  const [showItemEditor, setShowItemEditor] = useState(false);

  // stores currently selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // signals whether user signed in with google
  const [usedOAuth, setUsedOAuth] = useState(false);

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
        prepSelectedItems,
        setPrepSelectedItems,
        selectedItems,
        setSelectedItems,
        maxID,
        setMaxID,
        showItemAdder,
        setShowItemAdder,
        zValue,
        setZValue,
        selectedItem,
        setSelectedItem,
        showItemEditor,
        setShowItemEditor,
        usedOAuth,
        setUsedOAuth,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
