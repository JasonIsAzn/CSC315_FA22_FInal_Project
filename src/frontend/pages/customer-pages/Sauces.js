import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Sauces() {
  // prep-sauces data
  const { sauces } = useContext(GlobalContext);
  if (sauces[sauces.length - 1].value != -1) {
    sauces.push({
      label: "no_sauce",
      value: -1,
      price: 0,
    });
  }
  const [selectedSauce, setSelectedSauce] = useState(sauces);

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-sauce");
    if (data) {
      setSelectedSauce(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedSauce.length; i++) {
        selectedSauce[i].selected = "";
      }
    }
    for (let i = 0; i < selectedSauce.length; i++) {
      if (selectedSauce[i].selected === "checked") {
        document.getElementById(selectedSauce[i].value).checked = true;
      } else {
        document.getElementById(selectedSauce[i].value).checked = false;
      }
    }
  }, []);

  useEffect(() => {
    const showMeatVeggieOpt = JSON.parse(
      localStorage.getItem("selected-pizza")
    ).type;
    if (showMeatVeggieOpt === 2 || showMeatVeggieOpt === 3) {
      document.getElementById("nav-btn-all").style.display = "none";
      document.getElementById("nav-btn-sauces-drizzles").style.display = "flex";
    } else {
      document.getElementById("nav-btn-all").style.display = "flex";
      document.getElementById("nav-btn-sauces-drizzles").style.display = "none";
    }

    for (let i = 0; i < selectedSauce.length; i++) {
      if (selectedSauce[i].selected === "checked") {
        document.getElementById(selectedSauce[i].value).checked = true;
      } else {
        document.getElementById(selectedSauce[i].value).checked = false;
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

  // stores selected sauce and update button
  const selectingSauce = async (event, index, id) => {
    if (selectedSauce[index].selected === "") {
      for (let i = 0; i < selectedSauce.length; i++) {
        selectedSauce[i].selected = "";
        document.getElementById(selectedSauce[i].value).checked = false;
      }
      selectedSauce[index].selected = "checked";
      document.getElementById(id).checked = true;
    }
    localStorage.setItem("selected-sauce", JSON.stringify(selectedSauce));
  };

  // Delete Local Storage
  const resetStorage = () => {
    localStorage.removeItem("selected-meats");
    localStorage.removeItem("selected-veggies");
    localStorage.removeItem("selected-drizzles");
    localStorage.removeItem("selected-pizza");
    localStorage.removeItem("selected-sauce");
    localStorage.removeItem("sauce-count");
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
      <div className="flex flex-row mt-2 justify-end">
        <button
          className="bg-[#90ee90] hover:bg-white hover:text-[#90ee90] hover:border-[#90ee90] hover:border-2 text-white p-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={addOrder}
        >
          <h1 className="">Add to Order</h1>
        </button>
        <button
          className="bg-[#ED2939] hover:bg-white hover:text-[#ED2939] hover:border-[#ED2939] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center whitespace-nowrap"
          onClick={goCancel}
        >
          <h1 className="">Cancel</h1>
        </button>
      </div>

      <div id="nav-btn-all" className="w-screen flex justify-right mt-2">
        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goSauces}
        >
          Sauces
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
      </div>

      <div
        id="nav-btn-sauces-drizzles"
        className="w-screen flex justify-right mt-2"
      >
        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goSauces}
        >
          Sauces
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goDrizzles}
        >
          Drizzles
        </button>
      </div>

      {/* sauce buttons */}
      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Sauce</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
          {sauces.map((sauce, index) => (
            <div className="mx-auto">
              {/* TODO: save sauce type */}
              {/* when clicked save id to local storage. if radio == local storage, then check */}
              <input
                type="checkbox"
                class="hidden"
                name="sauce-btn"
                onChange={(event) => selectingSauce(event, index, sauce.value)}
                id={sauce.value}
              />
              <label
                class=""
                className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center"
                for={sauce.value}
              >
                {sauce.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* TODO: pizza animation */}
    </div>
  );
}
