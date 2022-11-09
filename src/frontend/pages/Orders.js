import React, { useEffect, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/");
  };

  // sends the user to the Server page
  const goServer = () => {
    navigate("/server");
  };

  // sends the user to the Inventory page
  const goInventory = () => {
    navigate("/inventory");
  };

  // sends the user to the Sales page
  const goSales = () => {
    navigate("/sales");
  };


  const [orders, setOrders] = useState([]);

  const getOrders = async() => {
    try {
      const response = await fetch("http://localhost:5001/orders") // get request
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    getOrders();
  }, [])
  console.log(orders);

  useEffect(() => {
    const main = async() => {
        axios.get("api/orders").then((response) => {
            console.log("RESPONSE: ", response)
        })
    }
    main()
  }, [])


  return (
    <div className="h-screen overflow-y-hidden">
      <div className=" w-screen flex justify-center mt-16">
      <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Back</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goInventory}
        >
          <h1 className="">Inventory</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goSales}
        >
          Sales
        </button>

        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-6 p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goServer}
        >
          Server Mode
        </button>
      </div>
      <div className="w-4.5 h-3/4 bg-white text-black border-[#4FC3F7] border-2 mx-40 p-6 text-2xl flex justify-center mt-12 overflow-y-scroll">
      <Fragment>
        <table>
          <div className="flex">
            <div className="grid grid-cols-5 gap-4">
              <h1 className="font-bold text-xl">Name</h1>
              <h1 className="font-bold text-xl">Total Cost</h1>
              <h1 className="font-bold text-xl"># of Toppings</h1>
              <h1 className="ml-12 col-span-2 font-bold text-xl">Date</h1>
            </div>
          </div>
          <tbody>
            {orders.map(order => (
              <div className="grid grid-cols-5 gap-4">
                <h1 className="text-xl">{order.customer_name}</h1>
                <h1 className="text-xl">{order.total_cost}</h1>
                <h1 className="text-xl">{order.num_toppings}</h1>
                <h1 className="col-span-2 ml-8 text-xl">{String(order.time_stamp).substring(0, 10)}</h1>
              </div>
            ))}
          </tbody>
        </table>
      </Fragment>
    </div>
    </div>
  );
}

