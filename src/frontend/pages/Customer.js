import React, {Fragment, useEffect, useState} from "react";



export default function Customer() {

  /* START - TESTING DATABASE CONNECTION HERE - GET */
  const [items, setItems] = useState([]);

  const getItems = async() => {
    try {
      const response = await fetch("http://localhost:5000/items") // get request
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    getItems();
  }, [])
  // console.log(items);
  /* END - TESTING DATABASE CONNECTION HERE - GET */
  
  
  return (
    <div /*className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-4xl text-gray-400"*/>
      <h1>CUSTOMER PAGE</h1>
      {/* START TEST - FRONTEND DATABASE DISPLAY */}
      <Fragment>
        <table>
          <thread>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Price</th>
            </tr>
          </thread>
          <tbody>
            {items.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{item.price}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </Fragment>
      {/* END TEST - FRONTEND DATABASE DISPLAY */}

    </div>
  );
}
