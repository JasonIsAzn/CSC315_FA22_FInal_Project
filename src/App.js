import "./App.css";
import Login from "./frontend/pages/Login";
import Manager from "./frontend/pages/Manager";
import Server from "./frontend/pages/Server";
import Customer from "./frontend/pages/Customer";
import Inventory from "./frontend/pages/Inventory";
import Sales from "./frontend/pages/Sales";
import Orders from "./frontend/pages/Orders";

import Test from "./frontend/pages/Test";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/server" element={<Server />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
