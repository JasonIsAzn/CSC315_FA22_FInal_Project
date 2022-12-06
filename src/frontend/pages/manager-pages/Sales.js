import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GlobalContext from "../../context/GlobalContext";
import DatePicker from "react-datepicker";

export default function Sales() {
  const { listOrders, allOrders, setListOrders } = useContext(GlobalContext);

  // stores information for reports
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateCombo, setStartDateCombo] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [comboData, setComboData] = useState([]);

  // used to determine what contents are shown in data table
  const [displayData, setDisplayData] = useState(0);

  const navigate = useNavigate();

  // sends the user to the Home page
  const goHome = () => {
    navigate("/home");
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

  // MUI data table stuff
  const options = {
    filterType: "multiselect",
    responsive: "scroll",
    download: false,
    elevation: 10,
    print: false,
    viewColumns: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 200, 1000],
    selectableRows: "none",
  };

  // generates data for sales report
  const handleSalesReport = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let i = 0; i < listOrders.length; i++) {
      const orderDate = new Date(listOrders[i][4]);
      if (orderDate >= start && orderDate <= end) {
        salesData.push(listOrders[i]);
      }
    }

    setSalesData(salesData);
    setDisplayData(1);
  };

  // generates data for combo report (TODO) [FIXME]
  const handleComboReport = () => {
    const combos = [
      ["Smoked Chicken", "BBQ Sauce", 0],
      ["Pepperoni", "Fountain Drink", 0],
      ["Smoked Chicken", "Pineapple", 0],
      ["Cauliflower Dough", "Ranch", 0],
      ["Pepsi", "Meatballs", 0],
      ["Spinach", "Alfredo", 0],
      ["Pepperoni", "Jalapenos", 0],
      ["Cauliflower Dough", "Mushrooms", 0],
      ["Zesty Red", "Meatballs", 0],
      ["Pepperoni", "Green Peppers", 0],
      ["Salami", "Black Olives", 0],
      ["Banana Peppers", "Smoked Chicken", 0],
      ["Pepperoni", "Gatorade", 0],
      ["Alfredo", "Cauliflower Dough", 0],
      ["Mushrooms", "Smoked Chicken", 0],
      ["Meatballs", "BBQ Sauce", 0],
      ["Smoked Chicken", "Sriracha", 0],
      ["Diced Ham", "BBQ Sauce", 0],
      ["Spinach", "Meatballs", 0],
      ["Pepperoni", "Mushrooms", 0],
    ];

    for (let i = 0; i < allOrders.length; i++) {
      const orderDate = new Date(allOrders[i].time_stamp);
      if (orderDate >= startDateCombo) {
        let items = new Set();
        const data = allOrders[i].items;
        for (const item of data) {
          items.add(item);
        }

        for (let j = 0; j < combos.length; j++) {
          if (items.has(combos[j][0]) && items.has(combos[j][1])) {
            combos[j][2] += 1;
          }
        }
      }
    }

    setComboData(combos);
    setDisplayData(2);
  };

  // determines what data is shown in data table
  const determineData = () => {
    if (displayData === 0) {
      return listOrders;
    } else if (displayData === 1) {
      return salesData;
    } else {
      return comboData;
    }
  };

  // determines which columns to display based on data in table (TODO)
  const determineColumns = () => {
    if (displayData === 0) {
      return [
        { name: "id", options: { display: false } },
        "Customer Name",
        "Cost",
        "# Toppings",
        "Date",
      ];
    } else if (displayData === 1) {
      return [
        { name: "id", options: { display: false } },
        "Customer Name",
        "Cost",
        "# Toppings",
        "Date",
      ];
    } else {
      return [
        { name: "Item 1", options: { display: true } },
        "Item 2",
        "Frequency",
      ];
    }
  };

  // determines which title the data table has
  const determineTitle = () => {
    if (displayData === 0) {
      return "Order History";
    } else if (displayData === 1) {
      return "Sales Report";
    } else {
      return "Combo Report";
    }
  };

  // reverts back to general data table
  const handleEndReport = () => {
    setDisplayData(0);
    setSalesData([]);
    setComboData([]);
    setStartDate("");
    setEndDate("");
    setStartDateCombo("");
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <div className=" w-screen flex justify-center mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Home</h1>
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
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-[2%] p-6 rounded-lg text-l flex justify-center items-center"
          onClick={goServer}
        >
          Server Mode
        </button>
      </div>

      <div className="flex flex-row">
        {/* sidebar contents start here */}
        <aside className="border mt-[2%] mr-[1%] w-1/5 rounded-lg flex flex-col items-center py-[1%] h-screen">
          <div className="border w-[90%] items-center justify-center rounded-lg flex flex-col">
            <h1 className="font-semibold text-gray-600"> Sales Report </h1>
            <h3 className="text-gray-500 px-[12.5%] mb-[3%]">
              See all orders that occurred between two specified dates
            </h3>
            <DatePicker
              className="w-3/4 h-12 mt-[2%] mx-[13%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%]"
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />

            <DatePicker
              className="w-3/4 h-12 mt-[2%] mx-[13%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%]"
              placeholderText="End Date"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
            />
            <button
              className="mt-[2%] bg-green-400 border border-2 rounded-lg border-green-600 mb-[3%] w-3/4 hover:bg-white text-gray-500 mb-[6%] py-[1%]"
              onClick={handleSalesReport}
            >
              Generate Report
            </button>
          </div>

          <div className="border w-[90%] items-center justify-center rounded-lg flex flex-col mt-[10%]">
            <h1 className="font-semibold text-gray-600">Combo Report</h1>
            <h3 className="text-gray-500 px-[12.5%] mb-[3%]">
              See which item combinations are most popular since a specified
              date
            </h3>
            <DatePicker
              className="w-3/4 h-12 mt-[2%] mx-[13%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%]"
              placeholderText="Start Date"
              selected={startDateCombo}
              onChange={(date) => {
                setStartDateCombo(date);
              }}
            />

            <button
              className="mt-[2%] bg-green-400 border border-2 rounded-lg border-green-600 mb-[3%] w-3/4 hover:bg-white text-gray-500 mb-[6%] py-[1%]"
              onClick={handleComboReport}
            >
              Generate Report
            </button>
          </div>

          <button
            className="mt-[25%] bg-red-400 border border-2 rounded-lg px-[3%] border-red-600 w-3/4 py-[5%] hover:bg-white text-gray-600"
            onClick={handleEndReport}
          >
            End Report
          </button>
        </aside>
        {/* sidebar contents end here */}

        <div className="items-center justify-center px-[2%] pt-[2%] w-4/5">
          <MUIDataTable
            title={determineTitle()}
            data={determineData()}
            columns={determineColumns()}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
