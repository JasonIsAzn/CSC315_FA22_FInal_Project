import { LocalGasStationRounded } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";
import toppingImages from "./images";

export default function Drizzles() {
  // prep-drizzle data
  const { drizzles } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);

  const { veggies } = useContext(GlobalContext);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);

  const { meats } = useContext(GlobalContext);
  const [selectedMeats, setSelectedMeats] = useState(meats);

  const { sauces } = useContext(GlobalContext);
  const [selectedSauce, setSelectedSauce] = useState(sauces);

  let drizzlesTextFormatted = [];
  for (let i = 0; i < selectedDrizzles.length; ++i) {
    let formatText = selectedDrizzles[i].label;
    formatText = formatText.replace("_", " ");
    const texts = formatText.split(" ");
    if (texts[0] === "bbq") {
      texts[0] = "BBQ";
    }
    for (let j = 0; j < texts.length; ++j) {
      texts[j] = texts[j][0].toUpperCase() + texts[j].substr(1);
    }
    drizzlesTextFormatted.push(texts.join(" "));
  }

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-drizzles");
    const meatData = localStorage.getItem("selected-meats");
    const veggieData = localStorage.getItem("selected-veggies");
    const sauceData = localStorage.getItem("selected-sauce");

    if (veggieData) {
      setSelectedVeggies(JSON.parse(veggieData));
    } else {
      for (let i = 0; i < selectedVeggies.length; i++) {
        selectedVeggies[i].selected = "";
      }
      setSelectedVeggies(JSON.parse(JSON.stringify(selectedVeggies)));
    }

    if (sauceData) {
      setSelectedSauce(JSON.parse(sauceData));
    } else {
      for (let i = 0; i < selectedSauce.length; i++) {
        selectedSauce[i].selected = "";
      }
      setSelectedSauce(JSON.parse(JSON.stringify(selectedSauce)));
    }

    if (meatData) {
      setSelectedMeats(JSON.parse(meatData));
    } else {
      for (let i = 0; i < selectedMeats.length; i++) {
        selectedMeats[i].selected = "";
      }
      setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));
    }

    if (data) {
      setSelectedDrizzles(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedDrizzles.length; i++) {
        selectedDrizzles[i].selected = "";
      }
      setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
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
    if (showMeatVeggieOpt === 1 || showMeatVeggieOpt === 2) {
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
    setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
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
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center border-2 border-black"
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
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center border-2 border-black"
          onClick={goDrizzles}
        >
          Drizzles
        </button>
      </div>

      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Drizzle</h1>
        <div className="grid lg:grid-cols-4">
          <div className="grid lg:grid-cols-4 col-span-3">
            {drizzles.map((drizzle, index) => (
              <div className="min-w-full">
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
                  className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border text-white font-bold p-24 rounded-lg text-l flex justify-center items-center min-h-full min-w-full whitespace-nowrap"
                >
                  {drizzlesTextFormatted[index]}
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
