import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import MUIDataTable from "mui-datatables";


export default function Test() {
  const { allItems, listItems } = useContext(GlobalContext);

  // MUI data table stuff
  const columns = ["id", "Name", "Count", "Price", "Type"];
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  };
  
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <MUIDataTable
        title={"Item Data"}
        data={listItems}
        columns={columns}
        options={options}
      />
    </div>
  );
}
