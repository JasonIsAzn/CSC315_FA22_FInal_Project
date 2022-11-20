import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Drinks() {
  // prep-drink data
  const { drinks } = useContext(GlobalContext);
  const [selectedDrinks, setSelectedDrinks] = useState(drinks);

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-drinks");
    if (data) {
      setSelectedDrinks(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedDrinks.length; i++) {
        selectedDrinks[i].selected = "";
      }
    }
    for (let i = 0; i < selectedDrinks.length; i++) {
      if (selectedDrinks[i].selected === "checked") {
        document.getElementById(selectedDrinks[i].value).checked = true;
      } else {
        document.getElementById(selectedDrinks[i].value).checked = false;
      }
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < selectedDrinks.length; i++) {
      if (selectedDrinks[i].selected === "checked") {
        document.getElementById(selectedDrinks[i].value).checked = true;
      } else {
        document.getElementById(selectedDrinks[i].value).checked = false;
      }
    }
  });

  // routes
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const goCustomer = () => {
    navigate("/customer");
  };

  const goDrinks = () => {
    navigate("/drinks");
  };

  const goCheckout = () => {
    navigate("/checkout");
  };

  // stores selected drink and update button
  const selectingDrinks = async (event, index, id) => {
    if (selectedDrinks[index].selected === "checked") {
      selectedDrinks[index].selected = "";
      document.getElementById(id).checked = false;
    } else {
      selectedDrinks[index].selected = "checked";
      document.getElementById(id).checked = true;
    }
    localStorage.setItem("selected-drinks", JSON.stringify(selectedDrinks));
  };

  return (
    <div className="h-screen overflow-y-show">
      <div className="w-screen flex justify-start mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Home</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goCustomer}
        >
          <h1 className="">Pizza</h1>
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
        >
          Checkout
        </button>
      </div>

      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Drinks</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
          {drinks.map((drink, index) => (
            <div className="mx-auto">
              <input
                type="checkbox"
                class="hidden"
                name="drink-btn"
                onChange={(event) => selectingDrinks(event, index, drink.value)}
                id={drink.value}
              />
              <label
                class=""
                for={drink.value}
                className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center"
              >
                {drink.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
