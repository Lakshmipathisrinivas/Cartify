import React from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';

import axios from 'axios';
import { useState,useEffect ,useContext} from 'react';

import { useNavigate } from 'react-router-dom';


const ProductCard = ({ isMobile }) => {

  const { search, products, searchResults, isLoading } = useContext(DataContext);

  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios?.get('http://localhost:5000/api/products')
      .then(response => {
        if(search=="")
          setProductDetails(response.data);
        else
          setProductDetails(searchResults);
      })
      .catch(error => {
        setError(true);
      });
  }, [search]);

  if (error) {
    return (
      <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oops!</strong>
        <span className="block sm:inline"> Something went wrong. Unable to display product details.</span>
      </div>
    );
  }

  // const {
  //   _id,
  //   title,
  //   category,
  //   image,
  //   price,
  // } = productDetails;

  return (
    <div className={` grid grid-cols-3 flex justify-content gap-4 h-[-100px] w-full sm:w-full p-2 ${isMobile ? 'text-gray-600' : ''}`}>
      {/* <Link to={`/product/${_id}`}> */}
      {productDetails && productDetails.map(product => (
        <div onClick={() => navigate(`/product/${product._id}`)} key={product._id} className="h-48 w-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            alt={product.title}
            className="object-contain object-center w-full h-[100px]"
            src={product.image}
          />
          <div className="p-2 w-full">
            <h3 className={`tracking-widest text-xs text-indigo-500 font-medium title-font ${isMobile ? 'text-gray-600' : ''}`}>
              {product.category}
            </h3>
            <h2 className={`text-lg text-gray-900 font-medium title-font mb-4 ${isMobile ? 'text-gray-600' : ''}`}>{product.title}</h2>
            <p className={`leading-relaxed text-base ${isMobile ? 'text-gray-600' : ''}`}>${product.price}</p>
          </div>
        </div>
      ))}
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
