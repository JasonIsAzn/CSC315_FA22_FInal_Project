import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";
import toppingImages from "./images";

export default function Toppings() {
  // prep-meat data
  const {
    sauces,
    drizzles,
    meats,
    veggies,
    selectedItems,
    setSelectedItems,
    prepSelectedItems,
    setPrepSelectedItems,
  } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);
  const [selectedMeats, setSelectedMeats] = useState(meats);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);
  const [selectedSauce, setSelectedSauce] = useState(sauces);
  let [toppingList, setToppingList] = useState([[], [], [], []]);

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
    document.getElementById("topping-count").textContent =
      "(Pick " + (4 - count) + ")";
  }, []);

  // THIS IS HORRIBLE
  let [useEffectCount, setUseEffectCount] = useState(0);
  useEffect(() => {
    if (useEffectCount < 5) {
      toppingList = [[], [], [], []];
      for (let i = 0; i < selectedSauce.length; i++) {
        if (selectedSauce[i].selected === "checked") {
          toppingList[0].push(selectedSauce[i].label);
        }
      }
      for (let i = 0; i < selectedMeats.length; i++) {
        if (selectedMeats[i].selected === "checked") {
          toppingList[1].push(selectedMeats[i].label);
        }
      }

      for (let i = 0; i < selectedVeggies.length; i++) {
        if (selectedVeggies[i].selected === "checked") {
          toppingList[2].push(selectedVeggies[i].label);
        }
      }

      for (let i = 0; i < selectedDrizzles.length; i++) {
        if (selectedDrizzles[i].selected === "checked") {
          toppingList[3].push(selectedDrizzles[i].label);
        }
      }
      setToppingList(JSON.parse(JSON.stringify(toppingList)));
      useEffectCount = useEffectCount + 1;
      setUseEffectCount(useEffectCount);
    }
  }, [toppingList]);

  useEffect(() => {
    for (let i = 0; i < selectedMeats.length; i++) {
      if (selectedMeats[i].selected === "checked") {
        document.getElementById(selectedMeats[i].value).checked = true;
      } else {
        document.getElementById(selectedMeats[i].value).checked = false;
      }
    }
    document.getElementById("topping-count").textContent =
      "(Pick " + (4 - count) + ")";
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
      } else {
        document.getElementById(id).checked = false;
      }
    }
    setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));

    document.getElementById("topping-count").textContent =
      "Pick (" + (4 - count) + ")";

    localStorage.setItem("topping-count", count);
    localStorage.setItem("selected-meats", JSON.stringify(selectedMeats));

    toppingList = [[], [], [], []];
    for (let i = 0; i < selectedSauce.length; i++) {
      if (selectedSauce[i].selected === "checked") {
        toppingList[0].push(selectedSauce[i].label);
      }
    }
    for (let i = 0; i < selectedMeats.length; i++) {
      if (selectedMeats[i].selected === "checked") {
        toppingList[1].push(selectedMeats[i].label);
      }
    }

    for (let i = 0; i < selectedVeggies.length; i++) {
      if (selectedVeggies[i].selected === "checked") {
        toppingList[2].push(selectedVeggies[i].label);
      }
    }

    for (let i = 0; i < selectedDrizzles.length; i++) {
      if (selectedDrizzles[i].selected === "checked") {
        toppingList[3].push(selectedDrizzles[i].label);
      }
    }
    setToppingList(JSON.parse(JSON.stringify(toppingList)));
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
    prepSelectedItems.push([]);
    var my_order = { type: "pizza", items: [] };
    prepSelectedItems[prepSelectedItems.length - 1].push(my_order);

    for (let i = 0; i < selectedSauce.length; ++i) {
      if (selectedSauce[i].selected === "checked") {
        if (selectedSauce[i].label != "no_sauce") {
          prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
            label: selectedSauce[i].label,
            value: selectedSauce[i].value,
            price: selectedSauce[i].price,
          });
        }
      }
    }

    for (let i = 0; i < selectedMeats.length; ++i) {
      if (selectedMeats[i].selected === "checked") {
        prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
          label: selectedMeats[i].label,
          value: selectedMeats[i].value,
          price: selectedMeats[i].price,
        });
      }
    }

    for (let i = 0; i < selectedVeggies.length; ++i) {
      if (selectedVeggies[i].selected === "checked") {
        prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
          label: selectedVeggies[i].label,
          value: selectedVeggies[i].value,
          price: selectedVeggies[i].price,
        });
      }
    }

    for (let i = 0; i < selectedDrizzles.length; ++i) {
      if (selectedDrizzles[i].selected === "checked") {
        prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
          label: selectedDrizzles[i].label,
          value: selectedDrizzles[i].value,
          price: selectedDrizzles[i].price,
        });
      }
    }

    setPrepSelectedItems(prepSelectedItems);

    resetStorage();
    goCustomer();
  };
  const goCancel = () => {
    resetStorage();
    goCustomer();
  };

  return (
    <div className="w-screen overflow-y-show">
      <div className="flex justify-center mt-5">
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
        <div className="inline-flex">
          <h1 class="text-3xl font-bold ml-10 mb-6 mt-10">Choose Meats</h1>
          <h2 id="topping-count" class="text-3xl font-bold ml-2 mb-6 mt-10">
            (Pick 4)
          </h2>
        </div>
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
              {sauces.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedSauce[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[0][0].key[selectedSauce[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                  <img
                    src={require("../../assets/Basecheese.png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Meats */}
              {meats.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedMeats[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[1][0].key[selectedMeats[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Veggies */}
              {veggies.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedVeggies[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[2][0].key[selectedVeggies[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Drizzles */}
              {drizzles.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedDrizzles[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[3][0].key[selectedDrizzles[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-64 p-5 ">
              <div>
                {toppingList[0].map((item, index) => (
                  <label className="">
                    {(toppingList[0].length != 0 && index === 0
                      ? "Sauce: "
                      : "") +
                      item +
                      (index != toppingList[0].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>

              <div>
                {toppingList[1].map((item, index) => (
                  <label className="">
                    {(toppingList[1].length != 0 && index === 0
                      ? "Meat(s): "
                      : "") +
                      item +
                      (index != toppingList[1].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>

              <div>
                {toppingList[2].map((item, index) => (
                  <label className="">
                    {(toppingList[2].length != 0 && index === 0
                      ? "Veggie(s): "
                      : "") +
                      item +
                      (index != toppingList[2].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>
              <div>
                {toppingList[3].map((item, index) => (
                  <label className="">
                    {(toppingList[3].length != 0 && index === 0
                      ? "Drizzle(s): "
                      : "") +
                      item +
                      (index != toppingList[3].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
