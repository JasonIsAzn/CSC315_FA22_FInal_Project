import React, {Fragment, useEffect, useState} from "react";

const Test = () => {
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
  console.log(items);
  
  
  return (
    <div>
      <h1>TEST PAGE</h1>
      {/* This is very ugly ;( */}
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
    </div>
  );
}


export default Test;