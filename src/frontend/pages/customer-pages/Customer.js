import React from "react";
import { useNavigate } from "react-router-dom";
import pizza_type from "./pizza_type";

export default function Customer() {
  const navigate = useNavigate();

  // back to login page
  const goHome = () => {
    navigate("/");
  };

  // pizza Btn
  const goCustomer = () => {
    navigate("/customer");
  };

  const goDrinks = () => {
    navigate("/drinks");
  };

  const goSauces = () => {
    navigate("/sauces");
  };
  const goCheckout = () => {
    navigate("/checkout");
  };



  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-screen flex justify-start mt-16">
      <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Back</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goCustomer}
        >
          <h1 className="">Pizza</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
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

      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Pizza</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
            {pizza_type.map(pizza => (
                <div> 
                    <button className="w-5.0 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center" onClick={goSauces}>{pizza.name}</button>
                </div>
            ))}
        </div>

      </div>

    </div>
  );
}