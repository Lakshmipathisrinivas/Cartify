// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const sampleProd = [{
    "_id": {
      "$oid": "663c2ff787dcd0256a5c6529"
    },
    "title": "Smartphone",
    "description": "A high-performance smartphone with advanced features.",
    "price": 599.99,
    "rating": {
      "rate": 4.5,
      "count": 120
    },
    "category": "Electronics",
    "image": "https://example.com/smartphone.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c652a"
    },
    "title": "Laptop",
    "description": "A powerful laptop for work and entertainment.",
    "price": 1299.99,
    "rating": {
      "rate": 4.8,
      "count": 85
    },
    "category": "Electronics",
    "image": "https://example.com/laptop.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c652b"
    },
    "title": "Headphones",
    "description": "Premium headphones with noise cancellation.",
    "price": 199.99,
    "rating": {
      "rate": 4.3,
      "count": 200
    },
    "category": "Electronics",
    "image": "https://example.com/headphones.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c652c"
    },
    "title": "Wireless Mouse",
    "description": "Ergonomic wireless mouse for comfortable usage.",
    "price": 29.99,
    "rating": {
      "rate": 4,
      "count": 150
    },
    "category": "Electronics",
    "image": "https://example.com/mouse.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c652d"
    },
    "title": "Coffee Maker",
    "description": "A modern coffee maker with programmable features.",
    "price": 79.99,
    "rating": {
      "rate": 4.6,
      "count": 95
    },
    "category": "Kitchen Appliances",
    "image": "https://example.com/coffee_maker.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c652e"
    },
    "title": "Fitness Tracker",
    "description": "Track your fitness goals with this advanced tracker.",
    "price": 129.99,
    "rating": {
      "rate": 4.2,
      "count": 180
    },
    "category": "Fitness",
    "image": "https://example.com/fitness_tracker.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c652f"
    },
    "title": "Bluetooth Speaker",
    "description": "Portable Bluetooth speaker for outdoor adventures.",
    "price": 49.99,
    "rating": {
      "rate": 4.4,
      "count": 120
    },
    "category": "Electronics",
    "image": "https://example.com/speaker.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c6530"
    },
    "title": "Backpack",
    "description": "Stylish and durable backpack for everyday use.",
    "price": 39.99,
    "rating": {
      "rate": 4.7,
      "count": 90
    },
    "category": "Fashion",
    "image": "https://example.com/backpack.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c6531"
    },
    "title": "Gaming Keyboard",
    "description": "Mechanical gaming keyboard with customizable RGB lighting.",
    "price": 99.99,
    "rating": {
      "rate": 4.9,
      "count": 75
    },
    "category": "Electronics",
    "image": "https://example.com/keyboard.jpg"
  },
  {
    "_id": {
      "$oid": "663c2ff887dcd0256a5c6532"
    },
    "title": "HD Television",
    "description": "Immerse yourself in stunning visuals with this HD television.",
    "price": 899.99,
    "rating": {
      "rate": 4.6,
      "count": 100
    },
    "category": "Electronics",
    "image": "https://example.com/television.jpg"
  }]
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(sampleProd);
  const [products, setProducts] = useState(sampleProd);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`);

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/product/${productId}`);
  
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const filteredResults = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [search, products]);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <DataContext.Provider value={{ search, setSearch, products, searchResults, isLoading, updateSearchResults, fetchProductById }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
