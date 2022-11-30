import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import GlobalContext from "../../context/GlobalContext";
import DatePicker from "react-datepicker";

// makes item names more formal
function formatName(name) {
  let result = "";
  const data = name.split("_");
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i][0].toUpperCase() + data[i].substring(1);
    result += data[i] + " ";
  }

  return result.substring(0, result.length - 1);
}

export default function Inventory() {
  const { listItems, allItems, listOrders, allOrders } =
    useContext(GlobalContext);

  // stores new item's information
  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  // stores information for reports
  const [threshold, setThreshold] = useState("");
  const [startDate, setStartDate] = useState("");
  const [restockItems, setRestockItems] = useState([]);
  const [excessItems, setExcessItems] = useState([]);

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
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100],
  };

  // handles new item creation
  async function addItem() {
    axios
      .post("http://localhost:5000/item/add_item", {
        name: itemName,
        price: price,
        count: count,
        type: type,
      })
      .then(() => {
        alert("SENT");
      })
      .then(() => {
        setCount(0);
        setItemName("");
        setPrice(0.0);
        setType("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  // generates data for restock report
  const handleRestockReport = () => {
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i][2] <= threshold) {
        restockItems.push([listItems[i][1], listItems[i][2]]);
      }
    }

    setRestockItems(restockItems);
    setDisplayData(1);
  };

  // generates data for excess report (TODO) [FIXME]
  const handleExcessReport = () => {
    // used to store each items' current and past inventory count
    let quants = new Map();
    for (let i = 0; i < allItems.length; i++) {
      quants.set(formatName(allItems[i].name), [
        Number(allItems[i].count),
        Number(allItems[i].count),
      ]);
    }

    // find past inventory counts
    const begin = new Date(startDate);
    for (let i = 0; i < allOrders.length; i++) {
      const orderDate = new Date(allOrders[i].time_stamp);
      if (orderDate >= begin) {
        const items = allOrders[i].items;
        for (const item of items) {
          quants.set(formatName(item), [
            quants.get(formatName(item))[0],
            quants.get(formatName(item))[1] + 1,
          ]);
        }
      }
    }

    // find all items with sold proportion <= .10
    let badItems = new Set();
    for (const [key, value] of quants) {
      if (value[0] / value[1] > 0.9) {
        badItems.add(key);
      }
    }

    for (let i = 0; i < listItems.length; i++) {
      if (badItems.has(listItems[i][1])) {
        let ratio =
          (
            1 -
            quants.get(listItems[i][1])[0] / quants.get(listItems[i][1])[1]
          ).toPrecision(4) * 100;
        excessItems.push([listItems[i][1], ratio]);
      }
    }

    setExcessItems(excessItems);
    setDisplayData(2);
  };

  // determines what data is shown in data table
  const determineData = () => {
    if (displayData === 0) {
      return listItems;
    } else if (displayData === 1) {
      return restockItems;
    } else {
      return excessItems;
    }
  };

  // determines which columns to display based on data in table (TODO)
  const determineColumns = () => {
    if (displayData === 0) {
      return ["id", "Name", "Count", "Price", "Type"];
    } else if (displayData === 1) {
      return ["Item Name", "Count"];
    } else {
      return ["Item Name", "% Sold"];
    }
  };

  // determines which title the data table has
  const determineTitle = () => {
    if (displayData === 0) {
      return "Inventory Contents";
    } else if (displayData === 1) {
      return "Restock Report";
    } else {
      return "Excess Report";
    }
  };

  // reverts back to general data table
  const handleEndReport = () => {
    setDisplayData(0);
    setRestockItems([]);
    setExcessItems([]);
    setThreshold("");
    setStartDate("");
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0">
      {/* header contents start here */}
      <div className="w-screen flex justify-center mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          <h1 className="">Home</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goInventory}
        >
          <h1 className="">Inventory</h1>
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-lg text-2xl flex justify-center items-center"
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
      {/* header contents end here */}

      <div className="flex flex-row">
        {/* sidebar contents start here */}
        <aside className="border mt-[2%] mr-[1%] w-1/5 rounded-lg flex flex-col items-center py-[1%] h-screen">
          <div className="border w-[90%] items-center justify-center rounded-lg flex flex-col">
            <h1 className="font-semibold text-gray-600">Restock Report</h1>
            <h3 className="text-gray-500 px-[12.5%] mb-[3%]">
              See which items' quantities have fallen below a specified
              threshold
            </h3>
            <input
              type="text"
              className="w-3/4 h-12 mt-[2%] mx-[13%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%]"
              placeholder="Threshold"
              value={threshold}
              onChange={(e) => {
                setThreshold(e.target.value);
              }}
            />

            <button
              className="mt-[2%] bg-green-400 border border-2 rounded-lg w-3/4 border-green-600 mb-[6%] py-[1%] hover:bg-white text-gray-600"
              onClick={handleRestockReport}
            >
              Generate Report
            </button>
          </div>

          <div className="border w-[90%] items-center justify-center rounded-lg flex flex-col mt-[15%]">
            <h1 className="font-semibold text-gray-600">Excess Report</h1>
            <h3 className="text-gray-500 px-[10%] mb-[3%]">
              See which items haven't been selling too well since a specified
              date
            </h3>
            <DatePicker
              className="w-3/4 h-12 mt-[2%] border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%] mx-[10%]"
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />

            <button
              className="mt-[2%] bg-green-400 border border-2 rounded-lg px-[3%] border-green-600 mb-[6%] w-3/4 py-[1%] hover:bg-white text-gray-600"
              onClick={handleExcessReport}
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

        <div className="px-[2%] flex flex-col w-4/5 h-auto">
          {/* add item contents start here */}
          <div className="flex justify-center items-center">
            <div className="w-3/4 ml-8 grid grid-cols-2 grid-rows-2 gap-y-[20%]">
              <input
                type="text"
                className="h-8 mx-[13%] mt-10 border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
                placeholder="Item Name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
              <input
                type="text"
                className="h-8 mx-[13%] mt-10 border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
                placeholder="Count"
                onChange={(e) => {
                  setCount(e.target.value);
                }}
              />
              <input
                type="text"
                className="h-8 mx-[13%] border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                type="text"
                className="h-8 mx-[13%] border border-1 border-black hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl"
                placeholder="Type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </div>
            <button
              className="w-32 ml-8 border-[#4FC3F7] border-2 rounded-lg flex justify-center items-center text-[#4FC3F7] text-xl font-bold"
              onClick={addItem}
            >
              Add item
            </button>
          </div>
          {/* add item contents end here */}

          <div>
            <MUIDataTable
              title={determineTitle()}
              data={determineData()}
              columns={determineColumns()}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
