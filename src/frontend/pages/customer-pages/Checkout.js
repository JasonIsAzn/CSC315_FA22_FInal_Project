import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Checkout() {
  const { selectedItems } = useContext(GlobalContext);

  // displays currently selected items
  function displayContents() {
    console.log(selectedItems);
    let contents = "";
    let total = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      contents +=
        "\t\t" +
        selectedItems[i].label +
        " ($" +
        selectedItems[i].price +
        ") \n";
      total += selectedItems[i].price;
    }

    contents += "\n\n\t\tTotal: $" + total;
    return contents;
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-4xl text-gray-400 flex-col">
      <h1>Checkout PAGE</h1>
      <div className="whitespace-pre-wrap px-[3%] py-[1%]">
        {displayContents()}
      </div>
    </div>
  );
}
