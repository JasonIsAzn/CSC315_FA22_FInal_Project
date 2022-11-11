import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Submission() {
  const { selectedItems, maxID, setSelectedItems, setMaxID } =
    useContext(GlobalContext);

  // stores customer name
  const [customerName, setCustomerName] = useState("");

  // displays currently selected items
  function displayContents() {
    console.log(selectedItems);
    let contents = "Order Contents: \n";
    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      contents +=
        "\t\t" +
        selectedItems[i].label +
        " ($" +
        selectedItems[i].price +
        ") \n";
      total += selectedItems[i].price;
    }

    contents += "\n\nTotal: $" + total;
    return contents;
  }

  const navigate = useNavigate();

  // sends the user to the Home page
  const goBack = () => {
    navigate("/server");
  };

  // sends the user to the Manager page
  const goManager = () => {
    navigate("/inventory");
  };

  // adds order and adjusts inventory
  const handleSubmission = () => {
    // add order data to DB
    let total = () => {
      let value = 0;
      for (let i = 0; i < selectedItems.length; i++) {
        value += selectedItems[i].price;
      }

      return value;
    };

    axios
      .post("http://localhost:5000/order", {
        name: customerName,
        cost: total(),
        num_toppings: 3,
        data: new Date().toISOString().split("T")[0],
        server_id: 1,
      })
      .then(() => {
        // associate order with all its items
        let addOI = async () => {
          for (let i = 0; i < selectedItems.length; i++) {
            await axios
              .post("http://localhost:5000/order_item", {
                order_id: maxID + 1,
                item_id: selectedItems[i].value,
              })
              .then((result) => {
                console.log(result);
              });
          }
        };

        addOI();
      })
      .then(() => {
        // update inventory based on order's contents
        let updateInventory = async () => {
          for (let i = 0; i < selectedItems.length; i++) {
            await axios
              .put("http://localhost:5000/items/count", {
                id: selectedItems[i].value,
              })
              .then((result) => {
                console.log(result);
              });
          }
        };

        updateInventory();
        setSelectedItems([]);
        setMaxID(maxID + 1);
        navigate("/server");
      })
      .then(() => {
        console.log("Order Processed");
      });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* header button content */}
      <div className="flex flex-row h-[5%] mt-[3%]">
        <button
          className="pb-[2.3%] px-[1.5%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center"
          onClick={goBack}
        >
          <h1 className="">Back</h1>
        </button>

        <button className="ml-[9%] pb-[2.3%] px-[25%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center font-bold whitespace-nowrap">
          <h1 className="">Order Submission</h1>
        </button>

        <button
          className=" ml-[9%] pb-[2.3%] px-[1.5%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center whitespace-nowrap"
          onClick={goManager}
        >
          <h1 className="">Manager Mode</h1>
        </button>
      </div>

      {/* main area with submission content */}
      <div className="p-[2%] flex flex-col items-center justify-center">
        <div className="w-2/5 text-3xl border border-2 text-gray-400 rounded-3xl">
          <h1 className="mb-[3%] font-semibold  whitespace-pre-wrap px-[3%] py-[1%] ">
            {displayContents()}
          </h1>

          <input
            type="text"
            className="mx-[25%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-xl mb-[3%]"
            placeholder="Customer Name"
            onChange={(e) => {
              setCustomerName(e.target.value);
            }}
          />

          <button
            className="px-[25%] mx-[18%] mb-[5%] bg-green-300 hover:bg-white hover:text-green-400 hover:border-green-400 hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center"
            onClick={handleSubmission}
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}
