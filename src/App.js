import "./App.css";
import Login from "./frontend/pages/Login";
import Server from "./frontend/pages/server-pages/Server";
import Inventory from "./frontend/pages/manager-pages/Inventory";
import Sales from "./frontend/pages/manager-pages/Sales";
import Drinks from "./frontend/pages/customer-pages/Drinks";
import Checkout from "./frontend/pages/customer-pages/Checkout";
import Toppings from "./frontend/pages/customer-pages/Toppings";
import Sauces from "./frontend/pages/customer-pages/Sauces";
import Veggies from "./frontend/pages/customer-pages/Veggies";
import Drizzles from "./frontend/pages/customer-pages/Drizzles";
import Customer from "./frontend/pages/customer-pages/Customer";
import Home from "./frontend/pages/Home";
import Locations from "./frontend/pages/Locations";
import Submission from "./frontend/pages/server-pages/Submission";
import Documentation from "./frontend/components/Documentation";
import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";

const client_id =
  "276997609841-if2htiha5o7n10ifa0ror9jsjnctuod1.apps.googleusercontent.com";

function App() {
  // misc. OAuth stuff
  function start() {
    gapi.client.init({
      clientId: client_id,
      scope: "",
    });
  }
  gapi.load("client:auth2", start);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/locations" element={<Locations />} />

      {/* Server Routes */}
      <Route path="/server" element={<Server />} />
      <Route path="/submission" element={<Submission />} />

      {/* Manager Routes */}
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/sales" element={<Sales />} />

      {/* Customer Routes */}
      <Route path="/customer" element={<Customer />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/toppings" element={<Toppings />} />
      <Route path="/sauces" element={<Sauces />} />
      <Route path="/veggies" element={<Veggies />} />
      <Route path="/drizzles" element={<Drizzles />} />

      {/* Misc. Route */}
      <Route path="/documentation" element={<Documentation />} />
    </Routes>
  );
}

export default App;
