import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Drizzles() {
    const navigate = useNavigate();
    
    // cancel btn 
    const goCustomer = () => {
        navigate("/customer");
    };
    
    // back btn
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

    const [drizzles, setDrizzles] = useState([]);

    const getDrizzles = async() => {
        try {
        const response = await fetch("http://localhost:5001/items") // get request
        const jsonData = await response.json();
        //   console.log("JSOSOSO", JSON.stringify(jsonData, null, 2))
        
        var drizzleToppings = jsonData.filter((data) => {
            return data.type == "drizzle"
        })

        console.log("TESTSOSOS", JSON.stringify(drizzleToppings, null, 2))
        setDrizzles(drizzleToppings);
        } catch (err) {
        console.error(err.message);
        }
    }
  
    useEffect(() => {
        getDrizzles();
    }, [])

    
    console.log(drizzles);


  return (
    <div className="h-screen overflow-y-hidden">
      <div className="w-screen flex justify-center mt-16">
      <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goSauces}
        >
          <h1 className="">Back</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goToppings}
        >
          <h1 className="">Meats</h1>
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

        <button
          className="w-1/5 h-1 bg-[#90ee90] hover:bg-white hover:text-[#90ee90] hover:border-[#90ee90] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goCustomer}
        >
          Add to Order
        </button>

        <button
          className="w-4.5 h-1 bg-[#ED2939] hover:bg-white hover:text-[#ED2939] hover:border-[#ED2939] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goCustomer}
        >
          Cancel
        </button>
      </div>
      
      <div>
      <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Drizzle</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
            {drizzles.map(drizzle => (
                <div className="mx-auto"> 
                      <input type="checkbox" class="hidden " id = {drizzle.name}/>
                      <label class="" for={drizzle.name} className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center">{drizzle.name}
                      </label>
                </div>
            ))}
        </div>

      </div>
      
    </div>
  );
}