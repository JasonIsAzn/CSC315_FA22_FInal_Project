import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sauces() {  
    const navigate = useNavigate();
    
    // cancel Btn or default option
    const goCustomer = () => {
    navigate("/customer");
    };

    const goToppings = () => {
    navigate("/toppings");
    };


    return (
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-4xl text-gray-400">
        <h1>SAUCES PAGE</h1>
      </div>
    );
  }