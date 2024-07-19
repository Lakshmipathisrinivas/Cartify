import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Context/DataContext';
import ProductCard from './ProductCard';

const Category = () => {
  const { search, products, updateSearchResults } = useContext(DataContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Update the search results using the function from the context
    const updatedList = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    // Filter products based on the selected category and search term
    const filteredByCategory = updatedList.filter(
      (product) =>
        !selectedCategory || // If no category is selected, show all
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    // Update the local state for rendering
    setFilteredProducts(filteredByCategory);
  }, [search, products, selectedCategory]);

  const filterProduct = (category) => {
    // Set the selected category
    setSelectedCategory(category);

    // Filter products based on the selected category and search term
    const updatedList = products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    // Update the search results using the function from the context
    updateSearchResults(updatedList);

    // Update the local state for rendering
    setFilteredProducts(updatedList);
  };

  return (
    <>
      <div className="m-5">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelry
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>

      <div className="flex flex-wrap -m-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} productDetails={product} />
        ))}
      </div>
    </>
  );
};

export default Category;
