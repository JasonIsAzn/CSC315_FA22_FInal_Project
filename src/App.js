import "./App.css";
import Login from "./frontend/pages/Login";
import Manager from "./frontend/pages/Manager";
import Server from "./frontend/pages/Server";
import Customer from "./frontend/pages/Customer";
import Inventory from "./frontend/pages/Inventory";
import Sales from "./frontend/pages/Sales";
import Orders from "./frontend/pages/Orders";
import Customer from "./frontend/pages/customer-pages/Customer";
import Inventory from "./frontend/pages/Inventory";
import Orders from "./frontend/pages/Orders";
import Drinks from "./frontend/pages/customer-pages/Drinks";
import Checkout from "./frontend/pages/customer-pages/Checkout";
import Toppings from "./frontend/pages/customer-pages/Toppings"
import Sauces from "./frontend/pages/customer-pages/Sauces"
import Veggies from "./frontend/pages/customer-pages/Veggies"
import Drizzles from "./frontend/pages/customer-pages/Drizzles"

import Test from "./frontend/pages/Test";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/server" element={<Server />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/orders" element={<Orders />} />
        
      {/* Customer Routes */}
      <Route path="/customer" element={<Customer />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/toppings" element={<Toppings />} />
      <Route path="/sauces" element={<Sauces />} />
      <Route path="/veggies" element={<Veggies />} />
      <Route path="/drizzles" element={<Drizzles />} />
        
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;