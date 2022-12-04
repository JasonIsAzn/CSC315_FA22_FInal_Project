import React, { useState, useContext } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import Select from "react-select";

export default function ItemAdder() {
  const {
    allItems,
    listItems,
    doughs,
    sauces,
    meats,
    drizzles,
    veggies,
    drinks,
    setDoughs,
    setSauces,
    setMeats,
    setDrizzles,
    setVeggies,
    setDrinks,
    setAllItems,
    setListItems,
    setShowItemAdder,
    setZValue,
  } = useContext(GlobalContext);

  // stores new item's information
  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  // choices for item types
  const typeList = [
    { label: "Dough", value: "dough" },
    { label: "Sauce", value: "sauce" },
    { label: "Meat", value: "topping-meat" },
    { label: "Drizzle", value: "drizzle" },
    { label: "Veggie", value: "topping-veggie" },
    { label: "Drink", value: "drink" },
  ];

  // handles new item creation
  const handleAddItem = () => {
    // process item information (frontend)
    let itemIDs = [];
    for (let i = 0; i < allItems.length; i++) {
      itemIDs.push(allItems[i].id);
    }

    const newItem = {
      id: Math.max(...itemIDs) + 1,
      name: itemName,
      price: Number(price),
      count: Number(count),
      type: type,
    };
    allItems.push(newItem);
    listItems.push([newItem.id, itemName, Number(count), Number(price), type]);
    setAllItems(allItems);
    setListItems(listItems);

    if (newItem.type === "sauce") {
      sauces.push({
        label: newItem.name,
        value: newItem.id,
        price: Number(newItem.price),
      });
      setSauces(sauces);
    } else if (newItem.type === "topping-meat") {
      meats.push({
        label: newItem.name,
        value: newItem.id,
        price: Number(newItem.price),
      });
      setMeats(meats);
    } else if (newItem.type === "drizzle") {
      drizzles.push({
        label: newItem.name,
        value: newItem.id,
        price: Number(newItem.price),
      });
      setDrizzles(drizzles);
    } else if (newItem.type === "topping-veggie") {
      veggies.push({
        label: newItem.name,
        value: newItem.id,
        price: Number(newItem.price),
      });
      setVeggies(veggies);
    } else if (newItem.type === "drink") {
      drinks.push({
        label: newItem.name,
        value: newItem.id,
        price: Number(newItem.price),
      });
      setDrinks(drinks);
    } else {
      doughs.push({
        label: newItem.name,
        value: newItem.id,
        price: Number(newItem.price),
      });
      setDoughs(doughs);
    }

    // process item information (backend)
    axios
      .post("http://localhost:5000/item", {
        name: itemName,
        price: price,
        count: count,
        type: type,
      })
      .then(() => {
        setCount("");
        setItemName("");
        setPrice("");
        setType("");
        setShowItemAdder(false);
        setZValue("z-0");
      });
  };

  // closes the popup window
  const closeItemAdder = () => {
    setShowItemAdder(false);
    setZValue("z-0");
  };

  // makes 'react-select' look better
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center rounded-md">
          <h1 className="text-gray-600 font-semibold text-lg">
            Create New Item
          </h1>
          <button onClick={closeItemAdder}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>

        {/* add item contents start here */}
        <div className="flex flex-col w-full">
          <div className="px-[2.5%] flex flex-row mt-[5%]">
            <input
              type="text"
              className="h-full py-[1.5%] border border-2 border-gray-300 focus:ring-0 focus:outline-none rounded-lg text-xl w-[90%] mr-[10%]"
              placeholder="Item Name"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <input
              type="text"
              className="h-full py-[1.5%] border border-2 border-gray-300 focus:ring-0 focus:outline-none rounded-lg text-xl w-[100%]"
              placeholder="Count"
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
          </div>
          <div className="px-[2.5%] flex flex-row my-[5%]">
            <input
              type="text"
              className="h-full py-[1.5%] border border-2 border-gray-300 focus:ring-0 focus:outline-none rounded-lg text-xl mr-[10%] w-[90%]"
              placeholder="Price ($)"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Select
              className="border border-2 border-gray-300 rounded-lg text-xl w-full"
              options={typeList}
              placeholder="Type"
              onChange={(type) => {
                setType(type.value);
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={style}
            />
          </div>

          <button
            className="w-3/4 bg-[#4FC3F7] border-2 rounded-lg flex justify-center items-center text-[#4FC3F7] text-xl font-bold mx-[12.5%] mb-[5%] hover:bg-white text-white hover:text-[#4FC3F7] hover:border-[#4FC3F7]"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
