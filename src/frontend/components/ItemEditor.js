import React, { useContext, useState } from "react";
import Select from "react-select";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function () {
  const {
    setShowItemEditor,
    selectedItem,
    setSelectedItem,
    setZValue,
    listItems,
    allItems,
    setListItems,
    setAllItems,
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
  } = useContext(GlobalContext);

  // stores edited item's information
  const [itemName, setItemName] = useState(selectedItem.name);
  const [count, setCount] = useState(selectedItem.count);
  const [price, setPrice] = useState(selectedItem.price);

  // determines selected item type for 'react-select'
  const determineType = () => {
    if (selectedItem.type === "dough") {
      return { label: "Dough", value: "dough" };
    } else if (selectedItem.type === "sauce") {
      return { label: "Sauce", value: "sauce" };
    } else if (selectedItem.type === "topping-meat") {
      return { label: "Meat", value: "topping-meat" };
    } else if (selectedItem.type === "drizzle") {
      return { label: "Drizzle", value: "drizzle" };
    } else if (selectedItem.type === "topping-veggie") {
      return { label: "Veggie", value: "topping-veggie" };
    } else if (selectedItem.type === "drink") {
      return { label: "Drink", value: "drink" };
    }
  };

  // handles updating of selected item
  const handleUpdateItem = () => {
    // process item information (frontend)
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id === selectedItem.id) {
        allItems[i].name = itemName;
        allItems[i].count = Number(count);
        allItems[i].price = Number(price);
        break;
      }
    }

    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i][0] === selectedItem.id) {
        listItems[i][1] = itemName;
        listItems[i][2] = Number(count);
        listItems[i][3] = Number(price);
      }
    }

    setAllItems(allItems);
    setListItems(listItems);

    if (selectedItem.type === "sauce") {
      const getIndex = () => {
        for (let i = 0; i < sauces.length; i++) {
          if (sauces[i].value === selectedItem.id) {
            return i;
          }
        }
      };

      sauces.splice(getIndex(), 1);
      sauces.push({
        label: selectedItem.name,
        value: selectedItem.id,
        price: Number(selectedItem.price),
      });
      setSauces(sauces);
    } else if (selectedItem.type === "topping-meat") {
      const getIndex = () => {
        for (let i = 0; i < meats.length; i++) {
          if (meats[i].value === selectedItem.id) {
            return i;
          }
        }
      };

      meats.splice(getIndex(), 1);
      meats.push({
        label: selectedItem.name,
        value: selectedItem.id,
        price: Number(selectedItem.price),
      });
      setMeats(meats);
    } else if (selectedItem.type === "drizzle") {
      const getIndex = () => {
        for (let i = 0; i < drizzles.length; i++) {
          if (drizzles[i].value === selectedItem.id) {
            return i;
          }
        }
      };

      drizzles.splice(getIndex(), 1);
      drizzles.push({
        label: selectedItem.name,
        value: selectedItem.id,
        price: Number(selectedItem.price),
      });
      setDrizzles(drizzles);
    } else if (selectedItem.type === "topping-veggie") {
      const getIndex = () => {
        for (let i = 0; i < veggies.length; i++) {
          if (veggies[i].value === selectedItem.id) {
            return i;
          }
        }
      };

      veggies.splice(getIndex(), 1);
      veggies.push({
        label: selectedItem.name,
        value: selectedItem.id,
        price: Number(selectedItem.price),
      });
      setVeggies(veggies);
    } else if (selectedItem.type === "drink") {
      const getIndex = () => {
        for (let i = 0; i < drinks.length; i++) {
          if (drinks[i].value === selectedItem.id) {
            return i;
          }
        }
      };

      drinks.splice(getIndex(), 1);
      drinks.push({
        label: selectedItem.name,
        value: selectedItem.id,
        price: Number(selectedItem.price),
      });
      setDrinks(drinks);
    } else {
      const getIndex = () => {
        for (let i = 0; i < doughs.length; i++) {
          if (doughs[i].value === selectedItem.id) {
            return i;
          }
        }
      };

      doughs.splice(getIndex(), 1);
      doughs.push({
        label: selectedItem.name,
        value: selectedItem.id,
        price: Number(selectedItem.price),
      });
      setDoughs(doughs);
    }

    // process item information (backend)
    axios
      .put("http://localhost:5000/item", {
        name: selectedItem.name,
        price: selectedItem.price,
        count: selectedItem.count,
        id: selectedItem.id,
      })
      .then(() => {
        setItemName("");
        setCount("");
        setPrice("");
        setSelectedItem(null);
        setZValue("z-0");
        setShowItemEditor(false);
      });
  };

  // closes popup window
  const closeItemEditor = () => {
    setShowItemEditor(false);
    setZValue("z-0");
    setSelectedItem(null);
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
          <h1 className="text-gray-600 font-semibold text-lg">Update Item</h1>
          <button onClick={closeItemEditor}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>

        {/* add item contents start here */}
        <div className="flex flex-col w-full">
          <div className="px-[2.5%] flex flex-row mt-[5%]">
            <input
              type="text"
              defaultValue={selectedItem.name}
              className="h-full py-[1.5%] border border-2 border-gray-300 focus:ring-0 focus:outline-none rounded-lg text-xl w-[90%] mr-[10%]"
              placeholder="Item Name"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <input
              type="text"
              defaultValue={selectedItem.count}
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
              defaultValue={selectedItem.price}
              className="h-full py-[1.5%] border border-2 border-gray-300 focus:ring-0 focus:outline-none rounded-lg text-xl mr-[10%] w-[90%]"
              placeholder="Price ($)"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Select
              className="border border-2 border-gray-300 rounded-lg text-xl w-full"
              options={null}
              isDisabled
              placeholder="Type"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={style}
              value={determineType()}
            />
          </div>

          <button
            className="w-3/4 bg-[#4FC3F7] border-2 rounded-lg flex justify-center items-center text-[#4FC3F7] text-xl font-bold mx-[12.5%] mb-[5%] hover:bg-white text-white hover:text-[#4FC3F7] hover:border-[#4FC3F7]"
            onClick={handleUpdateItem}
          >
            Update Item
          </button>
        </div>
      </div>
    </div>
  );
}
