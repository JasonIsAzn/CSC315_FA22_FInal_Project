import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Drinks() {  
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

  const goCheckout = () => {
    navigate("/checkout");
  };


  const [drinks, setDrinks] = useState([]);

  const getDrinks = async() => {
      try {
      const response = await fetch("http://localhost:5001/items") // get request
      const jsonData = await response.json();
      //   console.log("JSOSOSO", JSON.stringify(jsonData, null, 2))
      
      var drinkFiltered = jsonData.filter((data) => {
          return data.type == "drink"
      })

      console.log("TESTSOSOS", JSON.stringify(drinkFiltered, null, 2))
      setDrinks(drinkFiltered);
      } catch (err) {
      console.error(err.message);
      }
  }

  useEffect(() => {
      getDrinks();
  }, [])

  
  console.log(drinks);

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
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Drinks</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
            {drinks.map(topping => (
                <div className="mx-auto"> 
                      <input type="checkbox" class="hidden " id = {topping.name}/>
                      <label class="" for={topping.name} className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center">{topping.name}
                      </label>
                      <div>
                        <input type="text" id = {topping.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"/>
                        {/* <label> hello</label> */}
                        
                    </div>
                </div>
            ))}
        </div>

      </div>

    </div>
  );
}