import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { GoogleLogout } from "react-google-login";
import logo from "../assets/logo.png";

const client_id =
  "276997609841-if2htiha5o7n10ifa0ror9jsjnctuod1.apps.googleusercontent.com";

/**
 * Home page where user can select the mode (manager, server, or customer) they're looking to use the app in
 *
 */
export default function Home() {
  // TRANSLATE STUFF STARTS HERE //
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
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
  // TRANSLATE STUFF ENDS HERE //

  const { listOrders, allOrders, setListOrders, usedOAuth, setUsedOAuth } =
    useContext(GlobalContext);

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
    setUsedOAuth(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex flex-col">
      {/* header section for logout button */}
      
      <div className="flex justify-end items-center px-[3%] my-[1%]">
      <img src={logo} className="mr-[30%] h-16 w-56 mt-12" />
        {usedOAuth ? (
          <div id="signOutButton" className="mx-[5%]">
            <GoogleLogout
              clientId={client_id}
              buttonText="Sign out"
              onLogoutSuccess={logout}
            />
          </div>
        ) : (
          <button
            className="w-28 h-0 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-[4%] py-[2%] rounded-xl text-lg flex justify-center items-center px-[5%] whitespace-nowrap"
            onClick={logout}
          >
            End Session
          </button>
        )}
      </div>

      {/* main section for POS mode buttons */}
      <div className="flex justify-center items-start h-3/4">
        <button
          className="w-3/4 h-full hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2  hover:text-white font-bold mx-6 p-6 py-[10%] rounded-xl text-4xl"
          onClick={goCustomer}
        >
          Welcome to Spin 'N Stone!
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
          <div id="google_translate_element" className="border rounded-lg mt-6"></div>
        </div>
      </div>
    </div>
  );
}
