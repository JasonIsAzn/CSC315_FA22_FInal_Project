import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Veggies() {
  // prep-veggie data
  const { veggies } = useContext(GlobalContext);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);
  let count = localStorage.getItem("topping-count");
  let max_topping = JSON.parse(localStorage.getItem("selected-pizza"))
    .topping_amount[1];

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-veggies");
    if (data) {
      setSelectedVeggies(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedVeggies.length; i++) {
        selectedVeggies[i].selected = "";
      }
    }
    for (let i = 0; i < selectedVeggies.length; i++) {
      if (selectedVeggies[i].selected === "checked") {
        document.getElementById(selectedVeggies[i].value).checked = true;
      } else {
        document.getElementById(selectedVeggies[i].value).checked = false;
      }
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < selectedVeggies.length; i++) {
      if (selectedVeggies[i].selected === "checked") {
        document.getElementById(selectedVeggies[i].value).checked = true;
      } else {
        document.getElementById(selectedVeggies[i].value).checked = false;
      }
    }
  });

  // routes
  const navigate = useNavigate();

  const goCustomer = () => {
    navigate("/customer");
  };

  const goSauces = () => {
    navigate("/sauces");
  };

  const goToppings = () => {
    navigate("/toppings");
  };

  const goVeggies = () => {
    navigate("/veggies");
  };

  const goDrizzles = () => {
    navigate("/drizzles");
  };

  // stores selected veggie and update button
  const selectingVeggies = async (event, index, id) => {
    if (selectedVeggies[index].selected === "checked") {
      count--;
      selectedVeggies[index].selected = "";
      document.getElementById(id).checked = false;
    } else {
      if (count < max_topping) {
        count++;
        selectedVeggies[index].selected = "checked";
        document.getElementById(id).checked = true;
      } else {
        document.getElementById(id).checked = false;
      }
    }
    localStorage.setItem("topping-count", count);
    localStorage.setItem("selected-veggies", JSON.stringify(selectedVeggies));
  };

  // Delete Local Storage
  const resetStorage = () => {
    localStorage.removeItem("selected-meats");
    localStorage.removeItem("selected-veggies");
    localStorage.removeItem("selected-drizzles");
    localStorage.removeItem("selected-pizza");
    localStorage.removeItem("topping-count");
  };
  // Add to Order Function
  const addOrder = () => {
    resetStorage();
    goCustomer();
  };

  const goCancel = () => {
    resetStorage();
    goCustomer();
  };

  return (
    <div className="h-screen overflow-y-show">
      {/* navigation bar */}
      <div className="w-screen flex justify-center mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goSauces}
        >
          Back
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goToppings}
        >
          Meats
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goVeggies}
        >
          Veggies
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goDrizzles}
        >
          Drizzles
        </button>

        <button
          className="w-1/5 h-1 bg-[#90ee90] hover:bg-white hover:text-[#90ee90] hover:border-[#90ee90] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={addOrder}
        >
          Add to Order
        </button>

        <button
          className="w-4.5 h-1 bg-[#ED2939] hover:bg-white hover:text-[#ED2939] hover:border-[#ED2939] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goCancel}
        >
          Cancel
        </button>
      </div>
      {/* veggie buttons */}
      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Veggie</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
          {veggies.map((veggie, index) => (
            <div className="mx-auto">
              {/* save veggie chooses */}
              {/* increment counter */}
              <input
                type="checkbox"
                class="hidden"
                name="veggie-btn"
                onChange={(event) =>
                  selectingVeggies(event, index, veggie.value)
                }
                id={veggie.value}
              />
              <label
                class=""
                for={veggie.value}
                className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center"
              >
                {veggie.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
