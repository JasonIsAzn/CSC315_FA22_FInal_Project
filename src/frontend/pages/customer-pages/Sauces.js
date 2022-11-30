import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";
import toppingImages from "./images";

export default function Sauces() {
  // prep-sauces data
  const { drizzles } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);

  const { sauces } = useContext(GlobalContext);
  if (sauces[sauces.length - 1].value != -1) {
    sauces.push({
      label: "no_sauce",
      value: -1,
      price: 0,
    });
  }
  const [selectedSauce, setSelectedSauce] = useState(sauces);

  const { meats } = useContext(GlobalContext);
  const [selectedMeats, setSelectedMeats] = useState(meats);

  const { veggies } = useContext(GlobalContext);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);

  let saucesTextFormatted = [];
  for (let i = 0; i < selectedSauce.length; ++i) {
    let formatText = selectedSauce[i].label;
    formatText = formatText.replace("_", " ");
    const texts = formatText.split(" ");
    for (let j = 0; j < texts.length; ++j) {
      texts[j] = texts[j][0].toUpperCase() + texts[j].substr(1);
    }
    saucesTextFormatted.push(texts.join(" "));
  }

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-sauce");
    const meatData = localStorage.getItem("selected-meats");
    const veggieData = localStorage.getItem("selected-veggies");
    const drizzlesData = localStorage.getItem("selected-drizzles");

    if (veggieData) {
      setSelectedVeggies(JSON.parse(veggieData));
    } else {
      for (let i = 0; i < selectedVeggies.length; i++) {
        selectedVeggies[i].selected = "";
      }
      setSelectedVeggies(JSON.parse(JSON.stringify(selectedVeggies)));
    }

    if (meatData) {
      setSelectedMeats(JSON.parse(meatData));
    } else {
      for (let i = 0; i < selectedMeats.length; i++) {
        selectedMeats[i].selected = "";
      }
      setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));
    }

    if (drizzlesData) {
      setSelectedDrizzles(JSON.parse(drizzlesData));
    } else {
      for (let i = 0; i < selectedDrizzles.length; i++) {
        selectedDrizzles[i].selected = "";
      }
      setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
    }

    if (data) {
      setSelectedSauce(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedSauce.length; i++) {
        if (selectedSauce.label === "no_sauce") {
          selectedSauce[i].selected = "checked";
        } else {
          selectedSauce[i].selected = "";
        }
      }
      setSelectedSauce(JSON.parse(JSON.stringify(selectedSauce)));
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
    if (showMeatVeggieOpt === 1 || showMeatVeggieOpt === 2) {
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
    setSelectedSauce(JSON.parse(JSON.stringify(selectedSauce)));
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
    <div className="w-screen overflow-y-show">
      <div className="flex justify-center">
        <img
          src={require("../../assets/logo.png")}
          className=".max-w-full and .h-12"
        />
      </div>
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
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center border-2 border-black"
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
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center border-2 border-black"
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
        <div className="grid lg:grid-cols-4">
          <div className="grid lg:grid-cols-4 col-span-3">
            {sauces.map((sauce, index) => (
              <div className="">
                <input
                  type="checkbox"
                  class="hidden"
                  name="sauce-btn"
                  onChange={(event) =>
                    selectingSauce(event, index, sauce.value)
                  }
                  id={sauce.value}
                />
                <label
                  class=""
                  className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border text-white font-bold p-24 rounded-lg text-l flex justify-center items-center min-h-full min-w-full whitespace-nowrap"
                  for={sauce.value}
                >
                  {saucesTextFormatted[index]}
                </label>
              </div>
            ))}
          </div>
          {/* PIZZA ANIMATION HERE */}
          <div className="flex relative ml-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: true ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={require("../../assets/Nosauce.png")}
                class="h-64 absolute"
                alt=""
              />
            </motion.div>
            <div>
              {/* Generate Base Sauce */}
              {toppingImages[0].map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedSauce[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" + item.photo + ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Meats */}
              {toppingImages[1].map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedMeats[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" + item.photo + ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Veggies */}
              {toppingImages[2].map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedVeggies[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" + item.photo + ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Drizzles */}
              {toppingImages[3].map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedDrizzles[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" + item.photo + ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}
            </div>
            <div>
              <h1 class="mt-64 p-5">Toppings List</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
