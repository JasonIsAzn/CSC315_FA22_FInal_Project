import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GlobalContext from "../../context/GlobalContext";
import DatePicker from "react-datepicker";
import ItemAdder from "../../components/ItemAdder";
import ItemEditor from "../../components/ItemEditor";

export default function Inventory() {
  const {
    listItems,
    allItems,
    listOrders,
    allOrders,
    showItemAdder,
    setShowItemAdder,
    zValue,
    setZValue,
    showItemEditor,
    setShowItemEditor,
    setSelectedItem,
  } = useContext(GlobalContext);

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
    rowsPerPage: 50,
    rowsPerPageOptions: [50, 200, 1000],
    onRowClick: (rowData) => onRowClick(rowData),
    selectableRows: "none",
  };

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
      quants.set(allItems[i].name, [
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
          quants.set(item, [quants.get(item)[0], quants.get(item)[1] + 1]);
        }
      }
    }

    // find all items with sold proportion <= .10
    // let badItems = new Set();
    // for (const [key, value] of quants) {
    //   if (value[0] / value[1] > 0.9) {
    //     badItems.add(key);
    //   }
    // }

    for (let i = 0; i < listItems.length; i++) {
      // if (badItems.has(listItems[i][1])) {}
      let ratio =
        (1 - quants.get(listItems[i][1])[0] / quants.get(listItems[i][1])[1]) *
        100;
      excessItems.push([listItems[i][1], ratio.toPrecision(4)]);
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
      return [
        { name: "id", options: { display: false } },
        "Name",
        "Count",
        "Price",
        "Type",
      ];
    } else if (displayData === 1) {
      return [{ name: "Item Name", options: { display: true } }, "Count"];
    } else {
      return [{ name: "Item Name", options: { display: true } }, "% Sold"];
    }
  };

  // determines which title the data table has
  const determineTitle = () => {
    if (displayData === 0) {
      return "Inventory Content";
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

  // displays item adder popup
  const openItemAdder = () => {
    setShowItemAdder(true);
    setZValue("-z-10");
  };

  // displays item editor popup when item is selected
  const onRowClick = (rowData) => {
    if (displayData === 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (rowData[1] === allItems[i].name) {
          setSelectedItem(allItems[i]);
          break;
        }
      }

      setShowItemEditor(true);
      setZValue("-z-10");
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0">
      <div className="z-50">
        {showItemAdder && <ItemAdder />}
        {showItemEditor && <ItemEditor />}
      </div>

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
          <button
            className="my-[1%] bg-[#4FC3F7] border rounded-lg px-[3%] mb-[5%] w-[85%] py-[1%] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold text-md"
            onClick={openItemAdder}
          >
            Add New Item
          </button>
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

        <div
          className={`items-center justify-center px-[3%] pt-[3%] w-4/5 ${zValue}`}
        >
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
