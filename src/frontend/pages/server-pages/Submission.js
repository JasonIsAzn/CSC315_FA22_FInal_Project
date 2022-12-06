import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// converts date format to ideal form
function formatDate(date) {
  let part1 = date.substring(5);
  let part2 = date.substring(0, 4);
  let result = part1 + "-" + part2;
  return result;
}

export default function Submission() {
  const {
    selectedItems,
    maxID,
    setSelectedItems,
    setMaxID,
    allOrders,
    setAllOrders,
    listOrders,
    setListOrders,
    allItems,
    setAllItems,
    listItems,
    setListItems,
  } = useContext(GlobalContext);
  console.log(selectedItems);

  // stores customer name
  const [customerName, setCustomerName] = useState("");

  // displays currently selected items
  function displayContents() {
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

    contents += "\n\n\t\tTotal: $" + parseFloat(String(total)).toFixed(2);
    return contents;
  }

  const navigate = useNavigate();

  // sends the user to the Home page
  const goBack = () => {
    setSelectedItems([]);
    navigate("/server");
  };

  // sends the user to the Manager page
  const goManager = () => {
    setSelectedItems([]);
    navigate("/inventory");
  };

  // adds order and adjusts inventory
  const handleSubmission = () => {
    // compute order total cost
    let total = () => {
      let value = 0;
      for (let i = 0; i < selectedItems.length; i++) {
        value += selectedItems[i].price;
      }

      return value;
    };

    // process order information (frontend)
    const orderItems = new Set();
    for (let i = 0; i < selectedItems.length; i++) {
      orderItems.add(selectedItems[i].label);
    }

    const newOrder = {
      id: maxID + 1,
      customer_name: customerName,
      total_cost: total(),
      num_toppings: orderItems.size - 3,
      time_stamp: formatDate(new Date().toISOString().split("T")[0]),
      items: orderItems,
    };

    allOrders.push(newOrder);
    listOrders.push([
      newOrder.id,
      newOrder.customer_name,
      newOrder.total_cost,
      newOrder.num_toppings,
      newOrder.time_stamp,
    ]);

    setAllOrders(allOrders);
    setListOrders(listOrders);

    for (let i = 0; i < allItems.length; i++) {
      if (orderItems.has(allItems[i].name)) {
        allItems[i].count -= 1;
      }
    }

    for (let i = 0; i < listItems.length; i++) {
      if (orderItems.has(listItems[i][1])) {
        listItems[i][2] -= 1;
      }
    }

    setAllItems(allItems);
    setListItems(listItems);

    // process order information (backend)
    axios
      .post("http://localhost:5000/order", {
        name: customerName,
        cost: total(),
        num_toppings: 3,
        date: new Date().toISOString().split("T")[0],
      })
      .then(() => {
        // associate order with all its items
        let item_ids = [];
        for (let i = 0; i < selectedItems.length; i++) {
          item_ids.push(selectedItems[i].value);
        }

        axios
          .post("http://localhost:5000/order_item", {
            order_id: maxID + 1,
            ids: item_ids,
          })
          .then(() => {
            // update inventory based on order's contents
            let item_ids = [];
            for (let i = 0; i < selectedItems.length; i++) {
              item_ids.push(selectedItems[i].value);
            }

            axios
              .put("http://localhost:5000/item/count", {
                ids: item_ids,
              })
              .then(() => {
                setSelectedItems([]);
                setMaxID(maxID + 1);
                navigate("/server");
                console.log("Order Processed -", maxID);
              });
          });
      });
  };

  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      {/* header button content */}
      <div className="flex flex-row h-[5%] mt-[3%]">
        <button
          className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={goBack}
        >
          <h1 className="">Back</h1>
        </button>

        <button
          className=" ml-[78%] bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl flex justify-center items-center whitespace-nowrap"
          onClick={goManager}
        >
          <h1 className="">Manager Mode</h1>
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
          className="w-1/2 mx-[25%] bg-[#4FC3F7] mb-12 hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-1 px-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={handleSubmission}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
