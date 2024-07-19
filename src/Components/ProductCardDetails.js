import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import Loading from './Loading';
import { useDispatch } from 'react-redux'; 
import { addItem } from '../Redux/cartSlice';

const ProductCardDetails = () => {
  const { fetchProductById } = useContext(DataContext);
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('Product ID is undefined');
        return;
      }

      const productData = await fetchProductById(id);

      // Handle the fetched product data
      if (productData) {
        setProduct(productData);
      } else {
        // Handle the case where the product data cannot be fetched
        console.error('Product not found');
      }
    };

    fetchProduct();
  }, [id, fetchProductById]);

  if (!product) {
    return <Loading />;
  }

  const { title, description, category, image, rating: { rate, count }, price } = product;

  const handleAddItem = () => {
    dispatch(addItem(product));
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-12 mx-auto lg:py-24">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Product Image */}
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            src={image}
          />
          {/* Product Details */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/* Category and Title */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2 lg:text-base">
              {category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-2 lg:text-4xl">
              {title}
            </h1>
            {/* Rating */}
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    fill={index < Math.floor(rate) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 ml-2">
                  {rate} ({count} reviews)
                </span>
              </span>
            </div>
            {/* Description */}
            <p className="leading-relaxed text-sm lg:text-base">{description}</p>
            {/* Size Selection */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {['men\'s clothing', 'women\'s clothing'].includes(category) && (
                <div className="flex ml-6 items-center">
                  <span className="mr-2 lg:mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Price and Action Buttons */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-4">
              <span className="title-font font-medium text-2xl text-gray-900 mb-2 lg:mb-0">${price}</span>
              <button className="flex mt-4 lg:mt-0 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => handleAddItem()}>
                Add to Cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 mt-4 lg:mt-0">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCardDetails;
