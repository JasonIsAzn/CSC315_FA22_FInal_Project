import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import "./customer_page.css";
import logo from "../../assets/logo.png";

/**
 * Base page for customer mode of application; this is where customer users start creating their order
 *
 */
export default function Customer() {
  const {
    selectedItems,
    setSelectedItems,
    prepSelectedItems,
    setPrepSelectedItems,
    drinks,
  } = useContext(GlobalContext);

  const [selectedDrinks, setSelectedDrinks] = useState(drinks);
  const [selectedDrinksCounts, setSelectedDrinksCounts] = useState([]);

  // preset data for button
  const pizza_type = [
    {
      name: "Customize Pizza",
      type: 0,
      topping_amount: [0, 4],
    },
    {
      name: "Original Cheese",
      type: 1,
      topping_amount: [0, 0],
    },
    {
      name: "Classic Pepperoni",
      type: 2,
      topping_amount: [1, 1],
    },
  ];

  // Routes
  const navigate = useNavigate();

  const goCustomer = () => {
    // addDrinks();
    navigate("/customer");
  };

  const goDrinks = () => {
    navigate("/drinks");
  };

  const goSauces = () => {
    setTimeout(() => navigate("/sauces"), 1000);
  };

  const goCheckout = () => {
    navigate("/checkout");
  };

  // reset localStorage
  const goHome = () => {
    setSelectedItems([]);
    setPrepSelectedItems([]);
    resetStorage();
    navigate("/home");
  };

  useEffect(() => {
    const data = localStorage.getItem("selected-drinks");
    if (data) {
      setSelectedDrinks(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedDrinks.length; i++) {
        selectedDrinks[i].selected = "";
      }
      setSelectedDrinks(selectedDrinks);
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
      setSelectedDrinksCounts(selectedDrinksCounts);
    }
  }, []);

  useEffect(() => {
    let item_counter = prepSelectedItems.length;
    for (let i = 0; i < selectedDrinks.length; ++i) {
      if (selectedDrinks[i].selected === "checked") {
        item_counter++;
      }
    }
    document.getElementById("item-count").textContent =
      "(TOTAL ITEMS: " + item_counter + ")";
  });

  // Delete Local Storage
  const resetStorage = () => {
    localStorage.removeItem("selected-drinks");
    localStorage.removeItem("selected-drinks-counts");
  };

  const selectingPizza = async (event, pizza) => {
    localStorage.setItem("selected-pizza", JSON.stringify(pizza));
    let count = 0;
    localStorage.setItem("topping-count", count);
    goSauces();
  };

  return (
    <div className="w-screen overflow-y-show">
      <div className="flex justify-center mt-5">
        <img src={logo} alt="Spin 'N Stone Logo" className="h-16" />
      </div>
      {/* navigation bar */}
      <div className="w-screen flex justify-start mt-8">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          Home
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goCustomer}
        >
          Pizza
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goDrinks}
        >
          Drinks
        </button>

        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goCheckout}
          // Added drinks to selectedItems
        >
          Checkout
        </button>
      </div>

      {/* choose pizza buttons */}
      <div>
        <div className="inline-flex">
          <h1 class="text-3xl font-bold ml-10 mb-6 mt-10">Choose Pizza</h1>
          <h2 id="item-count" class="text-3xl font-bold ml-2 mb-6 mt-10">
            (TOTAL ITEMS: 0)
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 mx-12 mt-5 gap-3">
          {pizza_type.map((pizza) => (
            <div>
              <button
                className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border text-white font-bold p-24 rounded-lg text-l flex justify-center items-center min-h-full min-w-full whitespace-nowrap"
                name="pizza-btn"
                id={pizza.type}
                onClick={(event) => selectingPizza(event, pizza)}
              >
                {pizza.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
