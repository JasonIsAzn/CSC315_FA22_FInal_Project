// RECREATED code from Submission.js
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import party from "party-js";
import axios from "axios";

export default function Checkout() {
  const {
    selectedItems,
    maxID,
    setSelectedItems,
    setMaxID,
    prepSelectedItems,
    setPrepSelectedItems,
    drinks,
  } = useContext(GlobalContext);

  // stores customer name
  const [customerName, setCustomerName] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState(drinks);
  const [selectedDrinksCounts, setSelectedDrinksCounts] = useState([]);

  useEffect(() => {
    // Selected Drinks
    const data = localStorage.getItem("selected-drinks");
    if (data) {
      setSelectedDrinks(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedDrinks.length; i++) {
        selectedDrinks[i].selected = "";
      }
    }

    // Counts for Drinks
    const countData = localStorage.getItem("selected-drinks-counts");
    if (countData) {
      setSelectedDrinksCounts(JSON.parse(countData));
    } else {
      for (let i = 0; i < selectedDrinks.length; i++) {
        selectedDrinksCounts.push({
          drink_id: selectedDrinks[i].value,
          count: 0,
        });
      }
    }
    setPrepSelectedItems(prepSelectedItems);
  }, []);

  useEffect(() => {
    // confetti
    document.querySelectorAll(".confetti-button").forEach((e) =>
      e.addEventListener("click", function (e) {
        party.confetti(this);
      })
    );
  }, []);

  // THIS IS HORRIBLE
  let [useEffectCount, setUseEffectCount] = useState(0);
  useEffect(() => {
    if (useEffectCount < 2) {
      for (let i = 0; i < selectedDrinksCounts.length; ++i) {
        if (selectedDrinksCounts[i].count > 0) {
          prepSelectedItems.push([]);
          var my_order = {
            type: "drink",
            count: selectedDrinksCounts[i].count,
            items: selectedDrinks[i],
          };
          prepSelectedItems[prepSelectedItems.length - 1].push(my_order);
        }
      }
      useEffectCount = useEffectCount + 1;
      setUseEffectCount(useEffectCount);
    }
  }, [selectedDrinks]);

  // displays currently selected items
  function displayContents() {
    let contents = "";
    let total = 0;

    for (let i = 0; i < prepSelectedItems.length; ++i) {
      if (prepSelectedItems[i][0].type === "pizza") {
        if (prepSelectedItems[i][0].items.length == 0) {
          continue;
        }
        contents += "\t\tPizza:\n";
        for (let j = 0; j < prepSelectedItems[i][0].items.length; ++j) {
          contents +=
            "\t\t\t\t" +
            prepSelectedItems[i][0].items[j].label +
            " ($" +
            prepSelectedItems[i][0].items[j].price +
            ") \n";
          total += prepSelectedItems[i][0].items[j].price;
        }
      } else if (prepSelectedItems[i][0].type === "drink") {
        contents +=
          "\t\t" +
          "(" +
          prepSelectedItems[i][0].count +
          ") " +
          prepSelectedItems[i][0].items.label +
          " ($" +
          prepSelectedItems[i][0].items.price +
          ") \n";
        total += prepSelectedItems[i][0].items.price;
      }
    }

    contents += "\n\n\t\tTotal: $" + parseFloat(String(total)).toFixed(2);
    return contents;
  }

  const navigate = useNavigate();

  // sends the user to the Home page
  const goBack = async () => {
    setSelectedItems([]);
    // HORRIBLE SOLUTION
    for (let j = 0; j < 100; ++j) {
      for (let i = 0; i < prepSelectedItems.length; ++i) {
        if (prepSelectedItems[i][0].type === "drink") {
          prepSelectedItems.splice(i, 1);
        }
      }
    }
    console.log("rest drinks", prepSelectedItems);
    navigate("/customer");
  };
  // adds order and adjusts inventory
  const handleSubmission = () => {
    setSelectedItems([]);
    console.log("THIS TEST THO3", prepSelectedItems);
    for (let i = 0; i < prepSelectedItems.length; ++i) {
      if (prepSelectedItems[i][0].type === "pizza") {
        for (let j = 0; j < prepSelectedItems[i][0].items.length; ++j) {
          selectedItems.push(prepSelectedItems[i][0].items[j]);
        }
      } else if (prepSelectedItems[i][0].type === "drink") {
        selectedItems.push(prepSelectedItems[i][0].items);
      }
    }
    console.log("THIS THEST THO2: ", prepSelectedItems.length);
    console.log("THIS TEST THO: ", selectedItems);

    // compute order total cost
    let total = () => {
      let value = 0;
      for (let i = 0; i < selectedItems.length; i++) {
        value += selectedItems[i].price;
      }
      return value;
    };

    // add order information
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
                setPrepSelectedItems([]);

                for (let i = 0; i < selectedDrinks.length; ++i) {
                  selectedDrinks[i].selected = "";
                  selectedDrinksCounts[i].count = 0;
                }
                setSelectedDrinks(selectedDrinks);
                setSelectedDrinksCounts(selectedDrinksCounts);
                localStorage.setItem(
                  "selected-drinks",
                  JSON.stringify(selectedDrinks)
                );

                localStorage.setItem(
                  "selected-drinks-counts",
                  JSON.stringify(selectedDrinksCounts)
                );

                setMaxID(maxID + 1);
                navigate("/customer");
                console.log("Order Processed -", maxID);
              });
          });
      });
  };

  return (
    <div className="h-screen flex flex-col overflow-y-show">
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
          <h1 className="mb-[3%] whitespace-pre-wrap px-[3%] py-[1%] ">
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
