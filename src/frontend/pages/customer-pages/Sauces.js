import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Sauces() {
  // get sauces
  const { sauces } = useContext(GlobalContext);
  // routes
  const navigate = useNavigate();

  const goCustomer = () => {
    navigate("/customer");
  };

  const goToppings = () => {
    navigate("/toppings");
  };

  const changeSelectedItem = (e) => {
    console.log(e);
  };

  return (
    <div className="h-screen overflow-y-show">
      {/* navigation bar */}
      <div className="w-screen flex justify-right mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goToppings}
        >
          Next
        </button>

        <button
          className="w-4.5 h-1 bg-[#ED2939] hover:bg-white hover:text-[#ED2939] hover:border-[#ED2939] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goCustomer}
        >
          Cancel
        </button>
      </div>

      {/* sauce buttons */}
      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Sauce</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
          {sauces.map((sauce) => (
            <div className="mx-auto">
              {/* TODO: save sauce type */}
              {/* when clicked save id to local storage. if radio == local storage, then check */}
              <input
                type="radio"
                class="hidden"
                name="sauce-btn"
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
