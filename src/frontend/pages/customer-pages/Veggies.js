import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";
import toppingImages from "./images";

export default function Veggies() {
  // prep-veggie data
  const { drizzles } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);

  const { veggies } = useContext(GlobalContext);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);

  const { meats } = useContext(GlobalContext);
  const [selectedMeats, setSelectedMeats] = useState(meats);

  const { sauces } = useContext(GlobalContext);
  const [selectedSauce, setSelectedSauce] = useState(sauces);

  let count = localStorage.getItem("topping-count");
  let max_topping = JSON.parse(localStorage.getItem("selected-pizza"))
    .topping_amount[1];

  let veggiesTextFormatted = [];
  for (let i = 0; i < selectedVeggies.length; ++i) {
    let formatText = selectedVeggies[i].label;
    formatText = formatText.replace("_", " ");
    const texts = formatText.split(" ");
    for (let j = 0; j < texts.length; ++j) {
      texts[j] = texts[j][0].toUpperCase() + texts[j].substr(1);
    }
    veggiesTextFormatted.push(texts.join(" "));
  }

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-veggies");
    const drizzlesData = localStorage.getItem("selected-drizzles");
    const meatData = localStorage.getItem("selected-meats");
    const sauceData = localStorage.getItem("selected-sauce");

    if (meatData) {
      setSelectedMeats(JSON.parse(meatData));
    } else {
      for (let i = 0; i < selectedMeats.length; i++) {
        selectedMeats[i].selected = "";
      }
      setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));
    }

    if (sauceData) {
      setSelectedSauce(JSON.parse(sauceData));
    } else {
      for (let i = 0; i < selectedSauce.length; i++) {
        selectedSauce[i].selected = "";
      }
      setSelectedSauce(JSON.parse(JSON.stringify(selectedSauce)));
    }

    if (data) {
      setSelectedVeggies(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedVeggies.length; i++) {
        selectedVeggies[i].selected = "";
      }
    }

    if (drizzlesData) {
      setSelectedDrizzles(JSON.parse(drizzlesData));
    } else {
      for (let i = 0; i < selectedDrizzles.length; i++) {
        selectedDrizzles[i].selected = "";
      }
      setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
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

    setSelectedVeggies(JSON.parse(JSON.stringify(selectedVeggies)));

    localStorage.setItem("topping-count", count);
    localStorage.setItem("selected-veggies", JSON.stringify(selectedVeggies));
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

      <div className="w-screen flex justify-center mt-2">
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
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center border-2 border-black"
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

      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Veggie</h1>
        <div className="grid lg:grid-cols-4">
          <div className="grid lg:grid-cols-4 col-span-3">
            {veggies.map((veggie, index) => (
              <div className="min-w-full">
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
                  className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border text-white font-bold p-24 rounded-lg text-l flex justify-center items-center min-h-full min-w-full whitespace-nowrap"
                >
                  {veggiesTextFormatted[index]}
                </label>
              </div>
            ))}
          </div>
          {/* Pizza Animation */}
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
