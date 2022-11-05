import React, { useEffect, useState } from "react";
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


    const [sauces, setSauces] = useState([]);

    const getSauces = async() => {
        try {
        const response = await fetch("http://localhost:5001/items") // get request
        const jsonData = await response.json();
        //   console.log("JSOSOSO", JSON.stringify(jsonData, null, 2))
        
        var saucesFiltered = jsonData.filter((data) => {
            return data.type == "sauce"
        })

        console.log("TESTSOSOS", JSON.stringify(saucesFiltered, null, 2))
        setSauces(saucesFiltered);
        } catch (err) {
        console.error(err.message);
        }
    }
  
    useEffect(() => {
        getSauces();
    }, [])

    
  console.log(sauces);


  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-screen flex justify-right mt-16">
      <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goToppings}
        >
          <h1 className="">Next</h1>
        </button>

        <button
          className="w-4.5 h-1 bg-[#ED2939] hover:bg-white hover:text-[#ED2939] hover:border-[#ED2939] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goCustomer}
        >
          Cancel
        </button>
      </div>
      
      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Sauce</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
            {sauces.map(topping => (
                <div className="mx-auto"> 
                      <input type="radio" class="hidden " name="hello" id = {topping.name}/>
                      <label class="" className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center" for={topping.name}>{topping.name} 
                      
                      </label>
                </div>
            ))}
        </div>

      </div>
      
    </div>
  );
}