import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Drizzles() {
  // prep-drizzle data
  const { drizzles } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-drizzles");
    if (data) {
      setSelectedDrizzles(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedDrizzles.length; i++) {
        selectedDrizzles[i].selected = "";
      }
    }
    for (let i = 0; i < selectedDrizzles.length; i++) {
      if (selectedDrizzles[i].selected === "checked") {
        document.getElementById(selectedDrizzles[i].value).checked = true;
      } else {
        document.getElementById(selectedDrizzles[i].value).checked = false;
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

    for (let i = 0; i < selectedDrizzles.length; i++) {
      if (selectedDrizzles[i].selected === "checked") {
        document.getElementById(selectedDrizzles[i].value).checked = true;
      } else {
        document.getElementById(selectedDrizzles[i].value).checked = false;
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

  // stores selected drizzle and update button
  const selectingDrizzles = async (event, index, id) => {
    if (selectedDrizzles[index].selected === "checked") {
      selectedDrizzles[index].selected = "";
      document.getElementById(id).checked = false;
    } else {
      selectedDrizzles[index].selected = "checked";
      document.getElementById(id).checked = true;
    }
    localStorage.setItem("selected-drizzles", JSON.stringify(selectedDrizzles));
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

      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Drizzle</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
          {drizzles.map((drizzle, index) => (
            <div className="mx-auto">
              {/* save drizzle */}
              <input
                type="checkbox"
                class="hidden"
                name="drizzle-btn"
                onChange={(event) =>
                  selectingDrizzles(event, index, drizzle.value)
                }
                id={drizzle.value}
              />
              <label
                class=""
                for={drizzle.value}
                className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center"
              >
                {drizzle.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
