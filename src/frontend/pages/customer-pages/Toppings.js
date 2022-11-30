import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";
import toppingImages from "./images";

export default function Toppings() {
  // prep-meat data
  const { drizzles } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);

  const { meats } = useContext(GlobalContext);
  const [selectedMeats, setSelectedMeats] = useState(meats);

  const { veggies } = useContext(GlobalContext);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);

  const { sauces } = useContext(GlobalContext);
  const [selectedSauce, setSelectedSauce] = useState(sauces);

  let count = localStorage.getItem("topping-count");
  let max_topping = JSON.parse(localStorage.getItem("selected-pizza"))
    .topping_amount[1];

  let meatsTextFormatted = [];
  for (let i = 0; i < selectedMeats.length; ++i) {
    let formatText = selectedMeats[i].label;
    formatText = formatText.replace("_", " ");
    const texts = formatText.split(" ");
    for (let j = 0; j < texts.length; ++j) {
      texts[j] = texts[j][0].toUpperCase() + texts[j].substr(1);
    }
    meatsTextFormatted.push(texts.join(" "));
  }

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-meats");
    const drizzlesData = localStorage.getItem("selected-drizzles");
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
    if (drizzlesData) {
      setSelectedDrizzles(JSON.parse(drizzlesData));
    } else {
      for (let i = 0; i < selectedDrizzles.length; i++) {
        selectedDrizzles[i].selected = "";
      }
      setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
    }

    if (data) {
      setSelectedMeats(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedMeats.length; i++) {
        selectedMeats[i].selected = "";
      }
      setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));
    }

    for (let i = 0; i < selectedMeats.length; i++) {
      if (selectedMeats[i].selected === "checked") {
        document.getElementById(selectedMeats[i].value).checked = true;
      } else {
        document.getElementById(selectedMeats[i].value).checked = false;
      }
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < selectedMeats.length; i++) {
      if (selectedMeats[i].selected === "checked") {
        document.getElementById(selectedMeats[i].value).checked = true;
      } else {
        document.getElementById(selectedMeats[i].value).checked = false;
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

  // stores selected meat and update button
  const selectingMeats = async (event, index, id) => {
    if (selectedMeats[index].selected === "checked") {
      count--;
      selectedMeats[index].selected = "";
      document.getElementById(id).checked = false;
    } else {
      if (count < max_topping) {
        count++;
        selectedMeats[index].selected = "checked";
        document.getElementById(id).checked = true;
        // selectedItems.push({
        //   label: selectedMeats[index].label,
        //   value: selectedMeats[index].value,
        //   price: selectedMeats[index].price,
        // });
        // setSelectedItems(selectedItems);
      } else {
        document.getElementById(id).checked = false;
      }
    }
    setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));

    localStorage.setItem("topping-count", count);
    localStorage.setItem("selected-meats", JSON.stringify(selectedMeats));
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
          hidden="hidden"
          onClick={goSauces}
        >
          Sauces
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center border-2 border-black"
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

      {/* meat buttons */}
      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Meat</h1>
        <div className="grid lg:grid-cols-4">
          <div className="grid lg:grid-cols-4 col-span-3">
            {selectedMeats.map((meat, index) => (
              <div className="">
                <input
                  type="checkbox"
                  class="hidden"
                  name="meat-btn"
                  onChange={(event) => selectingMeats(event, index, meat.value)}
                  id={meat.value}
                />
                <label
                  class=""
                  for={meat.value}
                  className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border text-white font-bold p-24 rounded-lg text-l flex justify-center items-center min-h-full min-w-full whitespace-nowrap"
                >
                  {meatsTextFormatted[index]}
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
