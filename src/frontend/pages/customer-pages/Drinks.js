import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import logo from "../../assets/logo.png";

/**
 * Page where customer users can select their order's drink(s)
 *
 */
export default function Drinks() {
  // prep-drink data
  const {
    drinks,
    selectedItems,
    setSelectedItems,
    prepSelectedItems,
    setPrepSelectedItems,
  } = useContext(GlobalContext);

  const [selectedDrinks, setSelectedDrinks] = useState(drinks);
  const [selectedDrinksCounts, setSelectedDrinksCounts] = useState([]);

  let drinksTextFormatted = [];
  for (let i = 0; i < selectedDrinks.length; ++i) {
    let formatText = selectedDrinks[i].label;
    formatText = formatText.replace("_", " ");
    const texts = formatText.split(" ");
    if (texts[0] === "ftn") {
      texts[0] = "Fountain";
    }
    if (texts[0] === "mtn") {
      texts[0] = "Mountain";
    }
    for (let j = 0; j < texts.length; ++j) {
      texts[j] = texts[j][0].toUpperCase() + texts[j].substr(1);
    }
    drinksTextFormatted.push(texts.join(" "));
  }

  // Render Page - Initial Load Data
  useEffect(() => {
    // Selected Drinks
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

  // Render Page - Load onto Page
  useEffect(() => {
    // Format Selected Drinks
    for (let i = 0; i < selectedDrinks.length; i++) {
      if (selectedDrinks[i].selected === "checked") {
        document.getElementById(selectedDrinks[i].value).checked = true;
        // Show Count
        document
          .getElementById("minus-" + i)
          .setAttribute(
            "class",
            "h-8 w-8 flex items-center justify-center font-bold cursor-pointer border-b-2 border-black text-black"
          );
        document
          .getElementById("num-" + i)
          .setAttribute("class", "mx-4 font-bold");
        document
          .getElementById("plus-" + i)
          .setAttribute(
            "class",
            "h-8 w-8 items-center justify-center flex font-bold cursor-pointer border-b-2 border-black text-black"
          );
      } else {
        document.getElementById(selectedDrinks[i].value).checked = false;
        // Hide Count
        document
          .getElementById("minus-" + i)
          .setAttribute("class", "h-8 w-8 text-white");
        document
          .getElementById("num-" + i)
          .setAttribute("class", "mx-4 font-bold text-white");
        document
          .getElementById("plus-" + i)
          .setAttribute("class", "h-8 w-8 text-white");
      }
    }

    // Format Counts Button
    for (let i = 0; i < selectedDrinksCounts.length; i++) {
      document.getElementById("num-" + i).textContent =
        selectedDrinksCounts[i].count;
    }
  });

  // routes
  const navigate = useNavigate();

  const goCustomer = () => {
    navigate("/customer");
  };

  const goDrinks = () => {
    navigate("/drinks");
  };

  const goCheckout = () => {
    navigate("/checkout");
  };

  let item_counter = prepSelectedItems.length;
  let drink_counter = 0;
  for (let i = 0; i < selectedDrinks.length; ++i) {
    if (selectedDrinks[i].selected == "checked") {
      drink_counter++;
    }
  }
  item_counter += drink_counter;
  useEffect(() => {
    document.getElementById("item-count").textContent =
      "(TOTAL ITEMS: " + item_counter + ")";
  });

  // store selected drink and update button
  const selectingDrinks = async (event, index, id) => {
    if (selectedDrinks[index].selected === "checked") {
      selectedDrinks[index].selected = "";
      document.getElementById(id).checked = false;

      // Hide Count
      document
        .getElementById("minus-" + index)
        .setAttribute("class", "h-8 w-8 text-white");
      document
        .getElementById("num-" + index)
        .setAttribute("class", "mx-4 font-bold text-white");
      document
        .getElementById("plus-" + index)
        .setAttribute("class", "h-8 w-8 text-white");
      // Reset Count;
      selectedDrinksCounts[index].count = 0;
      document.getElementById("num-" + index).textContent =
        selectedDrinksCounts[index].count;
      localStorage.setItem(
        "selected-drinks-counts",
        JSON.stringify(selectedDrinksCounts)
      );
    } else {
      selectedDrinks[index].selected = "checked";
      document.getElementById(id).checked = true;

      // Show Count
      document
        .getElementById("minus-" + index)
        .setAttribute(
          "class",
          "h-8 w-8 flex items-center justify-center font-bold cursor-pointer border-b-2 border-black text-black"
        );
      document
        .getElementById("num-" + index)
        .setAttribute("class", "mx-4 font-bold");
      document
        .getElementById("plus-" + index)
        .setAttribute(
          "class",
          "h-8 w-8 items-center justify-center flex font-bold cursor-pointer border-b-2 border-black text-black"
        );
      // First Button Click
      if (selectedDrinksCounts[index].count === 0) {
        selectedDrinksCounts[index].count += 1;
        document.getElementById("num-" + index).textContent =
          selectedDrinksCounts[index].count;
        localStorage.setItem(
          "selected-drinks-counts",
          JSON.stringify(selectedDrinksCounts)
        );
      }
    }

    item_counter = prepSelectedItems.length;
    drink_counter = 0;
    for (let i = 0; i < selectedDrinks.length; ++i) {
      if (selectedDrinks[i].selected == "checked") {
        drink_counter++;
      }
    }
    item_counter += drink_counter;
    document.getElementById("item-count").textContent =
      "(TOTAL ITEMS: " + item_counter + ")";
    localStorage.setItem("selected-drinks", JSON.stringify(selectedDrinks));
  };

  // plus and minus counter
  const plusMinusCounter = async (event, increment_type, index) => {
    if (increment_type === "plus") {
      selectedDrinksCounts[index].count += 1;
    } else {
      if (selectedDrinksCounts[index].count > 1) {
        selectedDrinksCounts[index].count -= 1;
      }
    }
    document.getElementById("num-" + index).textContent =
      selectedDrinksCounts[index].count;
    localStorage.setItem(
      "selected-drinks-counts",
      JSON.stringify(selectedDrinksCounts)
    );
  };

  const resetStorage = () => {
    localStorage.removeItem("selected-drinks");
    localStorage.removeItem("selected-drinks-counts");
  };

  // Add to Order Function
  const goHome = () => {
    resetStorage();
    navigate("/home");
  };

  return (
    <div className="h-screen overflow-y-show">
      <div className="flex justify-center mt-5">
        <img src={logo} alt="Spin 'N Stone Logo" className="h-16" />
      </div>
      <div className="w-screen flex justify-start mt-8">
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
          className="w-1/2 h-1 hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2 hover:text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
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

      <div className="ml-5 mr-5">
        <div className="inline-flex">
          <h1 class="text-3xl font-bold ml-10 mb-6 mt-10">Choose Drink</h1>
          <h2 id="item-count" class="text-3xl font-bold ml-2 mb-6 mt-10">
            (TOTAL ITEMS: 0)
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 gap-3 mx-6">
          {drinks.map((drink, index) => (
            <div className="min-w-full">
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
                className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold my-1 p-20 rounded-lg text-l flex justify-center min-w-full items-center"
              >
                {drinksTextFormatted[index]}
              </label>

              <div className="h-10 w-auto flex items-center justify-center bg-[#FFF]">
                <span
                  className="h-8 w-8 text-white"
                  id={"minus-" + index}
                  name="plus/minus"
                  onClick={(event) => plusMinusCounter(event, "minus", index)}
                >
                  -
                </span>
                <span className="mx-4 font-bold text-white" id={"num-" + index}>
                  0
                </span>
                <span
                  className="h-8 w-8 text-white"
                  id={"plus-" + index}
                  onClick={(event) => plusMinusCounter(event, "plus", index)}
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
