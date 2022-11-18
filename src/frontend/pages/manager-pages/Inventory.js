import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import GlobalContext from "../../context/GlobalContext";

export default function Inventory() {
  const { listItems, allItems } = useContext(GlobalContext);

  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/home");
  };

  // sends the user to the Server page
  const goServer = () => {
    navigate("/server");
  };

  // sends the user to the Inventory page
  const goInventory = () => {
    navigate("/inventory");
  };

  // sends the user to the Sales page
  const goSales = () => {
    navigate("/sales");
  };

  // MUI data table stuff
  const columns = ["id", "Name", "Count", "Price", "Type"];
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  };
  async function addItem() {
    axios.post("/items/add_item", {
      name: itemName,
      price: price,
      count: count,
      type: type,
    }).then(() => {
      alert("SENT")
    }).then(() => {
      setCount(0);
      setItemName("");
      setPrice(0.00);
      setType("");
    }).catch((err) => {
      alert(err);
    })
  }
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-screen flex justify-center mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Home</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goInventory}
        >
          <h1 className="">Inventory</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goSales}
        >
          Sales
        </button>

        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goServer}
        >
          Server Mode
        </button>
      </div>
      <div className="px-[10%] pt-[3%] flex">
        <div className="grid-span-3">
        <MUIDataTable
          title={"Items"}
          data={listItems}
          columns={columns}
          options={options}
        /></div>
        <div className="flex justify-center items-center">
          <div className="h-48 w-3/4 ml-8 grid grid-cols-2 grid-rows-2">
          <input
            type="text"
            className="h-8 mx-[13%] mt-10 border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
            placeholder="Item Name"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
          <input
            type="text"
            className="h-8 mx-[13%] mt-10 border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
            placeholder="Count"
            onChange={(e) => {
              setCount(e.target.value);
            }}
          />
          <input
            type="text"
            className="h-8 mx-[13%] border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            type="text"
            className="h-8 mx-[13%] border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
            placeholder="Type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          </div>
          <button className="w-32 ml-8 border-[#4FC3F7] border-2 rounded-lg flex justify-center items-center text-[#4FC3F7] text-xl font-bold"
          onClick={addItem}
          >
            Add item
          </button>
          </div>
      </div>
      
    </div>
  );
}
