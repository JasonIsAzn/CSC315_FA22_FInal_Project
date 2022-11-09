import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

export default function Server() {
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    listItems,
    allItems,
    doughs,
    sauces,
    drinks,
    drizzles,
    meats,
    veggies,
  } = useContext(GlobalContext);

  function displayContents() {
    let contents = "";
    for (let i = 0; i < selectedItems.length; i++) {
      contents +=
        selectedItems[i].name + " (" + selectedItems[i].price + ") \n";
    }

    return contents;
  }

  const navigate = useNavigate();
  // sends the user to the Home page
  const goHome = () => {
    navigate("/");
  };

  // stores selected items
  const handleAddItem = (item) => {
    selectedItems.push(item);
    setSelectedItems(selectedItems);
  };

  // used to style 'react-select' drop downs
  const styles = {
    menuList: (base) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "0px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  return (
    <div className="h-screen">
      {/* header content is here */}
      <div className="flex flex-row h-[.5%]">
        <button
          className="pb-[3%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Back</h1>
        </button>

        <button className="mx-[33%] pb-[3%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center">
          <h1 className="">Create An Order</h1>
        </button>
      </div>

      <div className="flex flex-row">
        {/* main area with item content */}
        <div className="w-3/4 p-[5%]">
          <div className="grid grid-cols-3 gap-x-[15%] mb-[33%]">
            <Select
              options={doughs}
              placeholder="Dough"
              menuIsOpen={true}
              className="w-full"
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
            />
            <Select
              options={sauces}
              placeholder="Sauce"
              menuIsOpen={true}
              className="w-full"
              isMulti={true}
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
            />
            <Select
              options={meats}
              placeholder="Meat"
              menuIsOpen={true}
              className="w-full"
              isMulti={true}
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
            />
          </div>

          <div className="grid grid-cols-3 gap-x-[15%]">
            <Select
              placeholder="Drizzle"
              options={drizzles}
              menuIsOpen={true}
              className="w-full"
              isMulti={true}
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
            />
            <Select
              placeholder="Veggies"
              options={veggies}
              menuIsOpen={true}
              className="w-full"
              isMulti={true}
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
            />
            <Select
              placeholder="Drink"
              options={drinks}
              menuIsOpen={true}
              className="w-full"
              isMulti={true}
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
            />
          </div>
        </div>

        {/* sidebar with order contents */}
        <div className="w-1/4 border border-2 mt-[20%] rounded-xl mr-[1%]">
          {useEffect(() => {
            console.log(displayContents());
          }, [selectedItems])}
        </div>
      </div>
    </div>
  );
}
