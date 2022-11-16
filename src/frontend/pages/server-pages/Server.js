import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Server() {
  const {
    listItems,
    allItems,
    doughs,
    sauces,
    drinks,
    drizzles,
    meats,
    veggies,
    selectedItems,
    setSelectedItems,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/home");
  };

  // sends the user to the Manager page
  const goManager = () => {
    navigate("/inventory");
  };

  // sends user to submission page
  const goSubmission = () => {
    navigate("/submission");
  };

  // stores selected items
  const handleAddItem = (item) => {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        if (!selectedItems.includes(item[i])) {
          selectedItems.push(item[i]);
        }
      }
    } else {
      selectedItems.push(item);
    }
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
    <div className="h-screen flex flex-col">
      {/* header button content */}
      <div className="flex flex-row mt-8 justify-end">
        <button
          className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Home</h1>
        </button>
        <button
          className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center whitespace-nowrap"
          onClick={goManager}
        >
          <h1 className="">Manager Mode</h1>
        </button>
      </div>

      {/* main area with item content */}
      <div className="p-[4%]">
        <div className="grid grid-cols-3 gap-x-[8%] mb-[12%]">
          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">
              Dough
            </h1>
            <Select
              options={doughs}
              placeholder="Select Dough"
              className="w-full"
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">
              Sauce
            </h1>
            <Select
              options={sauces}
              placeholder="Select Sauce"
              className="w-full"
              isMulti
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">
              Meat
            </h1>
            <Select
              options={meats}
              placeholder="Select Meat"
              className="w-full"
              isMulti
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-[8%]">
          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">
              Drizzle
            </h1>
            <Select
              placeholder="Select Drizzle"
              options={drizzles}
              className="w-full"
              isMulti
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">
              Veggies
            </h1>
            <Select
              placeholder="Select Veggies"
              options={veggies}
              className="w-full"
              isMulti
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">
              Drink
            </h1>
            <Select
              placeholder="Select Drink"
              options={drinks}
              className="w-full"
              isMulti
              maxMenuHeight={150}
              onChange={handleAddItem}
              styles={styles}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-[8%] items-center justify-center flex">
        <button
          className="px-[15%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center"
          onClick={goSubmission}
        >
          Confirm Contents
        </button>
      </div>
    </div>
  );
}
