import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";


export default function Home() {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const { listOrders, allOrders, setListOrders } = useContext(GlobalContext);

  // misc. data activities
  for (let i = 0; i < listOrders.length; i++) {
    listOrders[i][3] = allOrders[i].num_toppings;
  }
  setListOrders(listOrders);

  const navigate = useNavigate();

  // sends the user to the Manager page
  const goManager = () => {
    navigate("/inventory");
  };

  // sends the user to the Server page
  const goServer = () => {
    navigate("/server");
  };

  // sends the user to the Customer page
  const goCustomer = () => {
    navigate("/customer");
  };

  const goLocations = () => {
    navigate("/locations");
  };

  // sends the user back to login page
  const logout = () => {
    navigate("/");
    window.location.reload(false); // prevents data duplication issue
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex flex-col">
      {/* header section for logout button */}
      
      <div className="flex justify-end items-center">
      <div id="google_translate_element"></div>
        <button
          className="w-28 h-0 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-12 py-[1%] rounded-xl text-xl flex justify-center items-center my-12"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* main section for POS mode buttons */}
      <div className="flex justify-center items-start h-3/4">
        <button
          className="w-3/4 h-full hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2  hover:text-white font-bold mx-6 p-6 py-[10%] rounded-xl text-4xl"
          onClick={goCustomer}
        >
          Welcome to Spin N' Stone!
        </button>
        <div className="h-1/3 grid grid-cols-1 ">
          <button
            className="w-32 h-20 hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2 hover:text-white font-bold mx-6 rounded-xl text-xl"
            onClick={goManager}
          >
            Manager
          </button>

          <button
            className="w-32 h-20 hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2 hover:text-white font-bold mx-6 rounded-xl text-xl mt-6"
            onClick={goServer}
          >
            Server
          </button>

          <button
            className="w-32 h-20 hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2 hover:text-white font-bold mx-6 rounded-xl text-xl mt-6"
            onClick={goLocations}
          >
            Locations
          </button>
        </div>
      </div>
    </div>
  );
}
