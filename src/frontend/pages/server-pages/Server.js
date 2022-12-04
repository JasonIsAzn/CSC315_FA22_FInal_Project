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

  // stores items selected from each group
  const [selectedDough, setSelectedDough] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState([]);
  const [selectedDrizzle, setSelectedDrizzle] = useState([]);
  const [selectedVeggie, setSelectedVeggie] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState([]);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const goManager = () => {
    navigate("/inventory");
  };

  const goSubmission = () => {
    navigate("/submission");
  };

  // stores selected items
  const handleAddItem = (item) => {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        if (!selectedItems.includes(item[i])) {
          selectedItems.push(item[i]);
          determineGroup(item[i]);
        }
      }
    } else {
      selectedItems.push(item);
      determineGroup(item);
    }
    setSelectedItems(selectedItems);
  };

  // clears selected items list
  const handleClearContents = () => {
    setSelectedItems([]);
    setSelectedDough([]);
    setSelectedSauce([]);
    setSelectedMeat([]);
    setSelectedDrizzle([]);
    setSelectedVeggie([]);
    setSelectedDrink([]);
  };

  // determines which group to associate selected Item with
  const determineGroup = (item) => {
    let nameDoughs = new Set();
    let nameSauces = new Set();
    let nameMeats = new Set();
    let nameDrizzles = new Set();
    let nameVeggies = new Set();
    let nameDrinks = new Set();

    for (const dough of doughs) {
      nameDoughs.add(dough.label);
    }

    for (const sauce of sauces) {
      nameSauces.add(sauce.label);
    }

    for (const meat of meats) {
      nameMeats.add(meat.label);
    }

    for (const drizzle of drizzles) {
      nameDrizzles.add(drizzle.label);
    }

    for (const veggie of veggies) {
      nameVeggies.add(veggie.label);
    }

    for (const drink of drinks) {
      nameDrinks.add(drink.label);
    }

    if (nameDoughs.has(item.label)) {
      selectedDough.push(item);
      setSelectedDough(selectedDough);
    } else if (nameSauces.has(item.label)) {
      selectedSauce.push(item);
      setSelectedSauce(selectedSauce);
    } else if (nameMeats.has(item.label)) {
      selectedMeat.push(item);
      setSelectedMeat(selectedMeat);
    } else if (nameDrizzles.has(item.label)) {
      selectedDrizzle.push(item);
      setSelectedDrizzle(selectedDrizzle);
    } else if (nameVeggies.has(item.label)) {
      selectedVeggie.push(item);
      setSelectedVeggie(selectedVeggie);
    } else if (nameDrinks.has(item.label)) {
      selectedDrink.push(item);
      setSelectedDrink(selectedDrink);
    }
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

    control: (base, state) => ({
      ...base,
      height: "60px",
      "min-height": "60px",
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
      <div className="p-[2%]">
        <div className="grid grid-cols-3 gap-x-[8%] mb-[12%]">
          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">Dough</h1>
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
              value={selectedDough}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">Sauce</h1>
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
              value={selectedSauce}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">Meat</h1>
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
              value={selectedMeat}
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
              value={selectedDrizzle}
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
              value={selectedVeggie}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-black mb-[3%] font-semibold text-3xl">Drink</h1>
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
              value={selectedDrink}
            />
          </div>
        </div>
      </div>
      <div className="mt-[2%] items-center justify-center flex flex flex-col">
        <button
          className="px-[7.5%] py-[1%] bg-yellow-400 hover:bg-white hover:text-yellow-600 hover:border-yellow-600 hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center mb-[2%]"
          onClick={handleClearContents}
        >
          Clear Contents
        </button>

        <button
          className="px-[15%] py-[1%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center"
          onClick={goSubmission}
        >
          Confirm Contents
        </button>
      </div>
    </div>
  );
}
