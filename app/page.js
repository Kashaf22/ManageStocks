"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";



export default function Home({router}) {
  const auth = getAuth();


  const dropdownItemStyle = {
    padding: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'bg-indigo-300', // Set your desired background color
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s ease'
  };

  const tickerStyle = {
    fontWeight: 'semi-bold',
    marginRight: '8px'
  };

  const priceStyle = {
    color: '#555555'
  };

  const quantityStyle = {
    color: '#555555'
  };

  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("")
  const [currentPrices, setCurrentPrices] = useState({});
  const [loadingaction, setLoadingaction] = useState(false)
  const [dropDown, setDropDown] = useState([
      {
        "ticker" : "ticker",
        "quantity" : "quantity",
        "price" : "price"
      }
  ]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/Stock', {
        method: 'GET' // Specify GET method
      });
    
      if (response.ok) {
        const responseData = await response.json();
      if (responseData.success) {
        setProducts(responseData.stock);
      }
      } else {
        console.error('Error fetching products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);

  const addProduct = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('/api/Stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        // Product added successfully
        const addedProduct = await response.json(); 
        setProducts([...products, productForm]);
        setAlert("Your Product has been added !")
        setProductForm({ ticker: '', quantity: '', price: '' });
        setAlert("")
      } else {
        // Handle error case
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    const response = await fetch('/api/Stock')
    const responseData = await response.json();
    setProducts(responseData.stock);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prevForm => ({ ...prevForm, [name]: value }));
  }

  const onDropdown = async (e) => {
    if (!e.target.value || e.target.value === "") {
      clearDropdown();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(e.target.value)}&timestamp=${Date.now()}`,
        {
          method: 'GET'
        }
      );

      if (response.ok) {
        const rjson = await response.json();
        setDropDown(rjson.products);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentPriceChange = (ticker, value) => {
    setCurrentPrices((prevPrices) => ({ ...prevPrices, [ticker]: value }));
  };

  const calculateProfitLoss = (ticker) => {
    const filteredProducts = products.filter(product => product.ticker === ticker);
    const totalInvested = filteredProducts.reduce((total, product) => (parseFloat(product.quantity) * parseFloat(product.price)), 0);
    const currentPrice = parseFloat(currentPrices[ticker] || 0);
    return (currentPrice * parseFloat(filteredProducts[0].quantity)) - totalInvested;
  };


const buttonAction = async (action, ticker, initialQuantity) => {
  try {
    setLoadingaction(true);
    let index = products.findIndex((item) => item.ticker === ticker);
    let newProducts = JSON.parse(JSON.stringify(products));

    if (action === "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }

    if (newProducts[index].quantity === 0) {
      newProducts.splice(index, 1); // Remove the stock from the inventory
    }

    setProducts(newProducts);

    // Immediately change the quantity of the product with given ticker in Dropdown
    let indexdrop = dropDown.findIndex((item) => item.ticker === ticker);
    let newDropdown = JSON.parse(JSON.stringify(dropDown));

    if (action === "plus") {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
    }
    
    if (newDropdown[indexdrop].quantity === 0) {
      newDropdown.splice(indexdrop, 1); // Remove the stock from the dropdown
    }
    setDropDown(newDropdown);

    const response = await fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, ticker, initialQuantity })
    });

    let r = await response.json();
    setLoadingaction(false); // Set loading action state to false after the action is completed
  } catch (error) {
    console.error('Error performing action:', error);
    setLoadingaction(false); // Set loading action state to false in case of an error
  }
};

const calculateTotalInvested = (ticker) => {
  const filteredProducts = products.filter(product => product.ticker === ticker);
  return filteredProducts.reduce((total, product) => total + (parseFloat(product.quantity) * parseFloat(product.price)), 0);
};

   const clearDropdown = () => {
    setDropDown([]);
  };

  return (
    <>
      <Header router={router} />
      <div className="container bg-white w-full max-w-screen-md p-8  items-center justify-center ">
        <div className='text-green-800 text-center'>{alert}</div>
        <h1 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
          Search a stock
        </h1>
        <div>
          <label htmlFor="stockSymbol">Stock Name</label>
          <input
            onChange={onDropdown}
            type="text"
            className="border border-gray-300 px-2 py-1 mb-2 w-full focus:outline-none focus:ring focus:border-indigo-300 text-black"
            placeholder="Enter stock name or ticker"
          />
          <label htmlFor="searchType">Search Type:</label>
          <select id="searchType" name="searchType">
            <option value="symbol">By Ticker</option>
            <option value="name">By Amount</option>
          </select>
          </div>
          <div className='dropDownmenu'>
          {dropDown.map(item => (
            <div key={item._id} className="container flex justify-between my-3 bg-indigo-300" style={dropdownItemStyle}>
              <span className='ticker' style={tickerStyle}>{item.ticker} {item.quantity} {item.quantity === '1' ? 'stock' : 'stocks'} available for ${item.price}</span>
              <div>
              <button onClick = {()=>{buttonAction("plus", item.ticker, item.quantity)}} disabled= {loadingaction} className='add inline-block px-3 py-1 cursor-pointer bg-indigo-100 text-white font-semibold rounded-lg shadow-md disabled:bg-indigo-300' style={quantityStyle}>+</button>
              <span className='quantity inline-block  min-w-3 mx-3' style={quantityStyle}>{item.quantity}</span>
              <button onClick = {()=>{buttonAction("minus", item.ticker, item.quantity)}} disabled= {loadingaction} className='subtract inline-block px-3 py-1 cursor-pointer bg-indigo-100 text-white font-semibold rounded-lg shadow-md disabled:bg-indigo-300' style={quantityStyle}>-</button>
              </div>
            </div>
          ))}
          </div>
          <div className="mt-8">
            <button
              onClick={onDropdown}
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-black"
            >Search</button>
          </div>
        </div>
      <div className="container bg-white w-full max-w-screen-md p-8  items-center justify-center ">
        <h1 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
          Add a Stock
        </h1>

        {/* Form to add a new stock */}
        <form className="mt-4">
          <label htmlFor= "ticker"className="block mb-2 font-normal text-gray-600">Stock Name:</label>
          <input
            type="text"
            id= "ticker"
            name="ticker"
            className="border border-gray-300 px-2 py-1 mb-2 w-full focus:outline-none focus:ring focus:border-indigo-300 text-black"
            placeholder="Enter stock name"
            value= {productForm.ticker}
            onChange={handleChange}
          />

          <label htmlFor= "quantity" className="block mb-2 font-normal text-gray-600">Quantity:</label>
          <input
            type="number"
            id = "quantity"
            name="quantity"
            className="border border-gray-300 px-2 py-1 mb-2 w-full focus:outline-none focus:ring focus:border-indigo-300 text-black"
            placeholder="Enter quantity"
            value= {productForm.quantity}
            onChange={handleChange}
          />

          <label htmlFor= "price" className="block mb-2 font-normal text-gray-600">Price:</label>
          <input
            type="number"
            id= "price"
            name="price"
            className="border border-gray-300 px-2 py-1 mb-2 w-full focus:outline-none focus:ring focus:border-indigo-300 text-black"
            placeholder="Enter price"
            value= {productForm.price}
            onChange={handleChange}
          />

          <div className="mt-8">
            <button
              onClick={addProduct}
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-black"
            >
              Add Stock
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h1 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
            Display Current Stock
          </h1>
          {/* Table to display current stock */}
          <table className="border-collapse border border-gray-300 mt-4 w-full">
            <thead>
              <tr className="text-center text-black">
                <th className="border border-gray-300 p-2">Stock Ticker</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Total Amount Invested</th>
                <th className="border border-gray-300 p-2">Total Amount Invested on Each Ticker</th>
                <th className="border border-gray-300 p-2">Current Price</th>
                <th className="border border-gray-300 p-2">Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row */}
              {products.map(product=>{
                const totalInvested = parseFloat(product.quantity) * parseFloat(product.price);
                const totalByTicker = calculateTotalInvested(product.ticker);
                const profitLoss = calculateProfitLoss(product.ticker);
                 return <tr className="text-center text-black" key={product.ticker+product.quantity}>
                   <td className="border border-gray-300 p-2">{product.ticker}</td>
                   <td className="border border-gray-300 p-2">{product.quantity}</td>
                   <td className="border border-gray-300 p-2">${product.price}</td>
                   <td className="border border-gray-300 p-2">${totalInvested.toFixed(2)}</td> 
                   <td className="border border-gray-300 p-2">${totalByTicker.toFixed(2)}</td> 
                   <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={currentPrices[product.ticker] || ''}
                        onChange={(e) => handleCurrentPriceChange(product.ticker, e.target.value)}
                        className="border border-gray-300 px-2 py-1 focus:outline-none focus:ring focus:border-indigo-300"
                        placeholder="Enter current price"
                      />
                    </td>
                    <td className={`border border-gray-300 p-2 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${profitLoss.toFixed(2)}
                    </td>
                 </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
            } 