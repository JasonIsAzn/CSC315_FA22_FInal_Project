import React, {useEffect, useState} from "react";



export default function Customer() {

  /*TESTING DATABASE CONNECTION HERE - GET*/

  const getItems = async() => {
    try {
      const response = await fetch("http://localhost:5000/items") // get request
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getItems();
  })

  
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-4xl text-gray-400">
      Customer Page
    </div>
  );
}
