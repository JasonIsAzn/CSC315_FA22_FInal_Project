// RECREATED code from Submission.js
import React, { useEffect, useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import party from "party-js";
import axios from "axios";

export default function Checkout() {
  const { selectedItems, maxID, setSelectedItems, setMaxID } =
    useContext(GlobalContext);

  // stores customer name
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    // confetti
    document.querySelectorAll(".confetti-button").forEach((e) =>
      e.addEventListener("click", function (e) {
        party.confetti(this);
      })
    );
  }, []);

  // displays currently selected items
  function displayContents() {
    console.log(selectedItems);
    let contents = "";
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

    contents += "\n\n\t\tTotal: $" + total;
    return contents;
  }

  const navigate = useNavigate();

  // sends the user to the Home page
  const goBack = () => {
    navigate("/customer");
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
      .post("http://localhost:5001/order", {
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
              .post("http://localhost:5001/order_item", {
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
              .put("http://localhost:5001/items/count", {
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
        goBack();
      })
      .then(() => {
        console.log("Order Processed");
      });
  };

  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <div className="flex justify-center mt-5">
        <img src={require("../../assets/logo.png")} className="" />
      </div>
      {/* header button content */}
      <div className="flex flex-row h-[5%] mt-[3%]">
        <button
          className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={goBack}
        >
          <h1 className="">Back</h1>
        </button>
      </div>

      {/* main area with submission content */}
      <div className="mt-4 flex justify-center items-center">
        <h1 className="text-[#4FC3F7] text-3xl font-semibold">Review Order</h1>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="h-2/4 w-2/5 text-2xl border border-2 text-black rounded-xl overflow-y-scroll">
          <h1 className="mb-[3%]   whitespace-pre-wrap px-[3%] py-[1%] ">
            {displayContents()}
          </h1>
        </div>

        <input
          type="text"
          className="w-1/2 h-12 mt-20 mx-[13%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-2xl mb-[3%]"
          placeholder="Customer Name"
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
        />

        <button
          className="w-1/2 mx-[25%] bg-[#4FC3F7] mb-12 hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-1 px-2 rounded-lg text-2xl flex justify-center items-center confetti-button"
          onClick={handleSubmission}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
