import React, { useEffect, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Inventory() {
  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/");
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

  const [items, setItems] = useState([]);

  const getItems = async() => {
    try {
      const response = await fetch("http://localhost:5001/items") // get request
      const jsonData = await response.json();
      console.log("JSOSOSO", JSON.stringify(jsonData, null, 2))
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    getItems();
  }, [])
  console.log(items);


  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-screen flex justify-center mt-16">
      <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Back</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goInventory}
        >
          <h1 className="">Inventory</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"

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
      <div className="w-4.5 h-3/4 bg-white text-black border-[#4FC3F7] border-2 mx-40 p-6 text-2xl flex justify-center mt-12 overflow-y-scroll">
      <Fragment>
        <table>
          <div className="flex">
            <div className="grid grid-cols-3 gap-4">
              <h1 className="font-bold text-xl">Name</h1>
              <h1 className="ml-16 font-bold text-xl">Count</h1>
              <h1 className="ml-16 font-bold text-xl">Price</h1>
            </div>
          </div>
          <tbody>
            {items.map(item => (
              <div className="grid grid-cols-3 gap-4">
                <h1 className="text-xl">{item.name}</h1>
                <h1 className="ml-14 text-xl">{item.count}</h1>
                <h1 className="ml-12 text-xl">{item.price}</h1>
              </div>
            ))}
          </tbody>
        </table>
      </Fragment>
    </div>
    </div>
  );

}

