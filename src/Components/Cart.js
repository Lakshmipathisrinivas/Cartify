import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart, removeItem, addItem, deleteItem } from '../Redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../Context/AuthContext';

const Cart = () => {
  const dispatch = useDispatch();
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const { isLoggedIn  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClearCart = () => {
    if (isLoggedIn) {
      dispatch(clearCart());
      setIsCheckoutSuccess(true); // Set success message visibility to true
    } else {
      // Navigate to the login page
      navigate('/login');
    }
  };

  const handleAddItem = (product) => {
    dispatch(addItem(product));
  };

  const handleDeleteItem = (product) => {
    dispatch(deleteItem(product));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem());
  };

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row shadow-md my-10">
          <div className="w-full md:w-3/4 bg-white px-4 md:px-10 py-8">
            <div className="flex justify-between border-b pb-4">
              <h1 className="font-semibold text-lg md:text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-lg md:text-2xl">{cartItems.length} Items</h2>
            </div>
            <div className="flex mt-6 mb-4">
              <h3 className="font-semibold text-gray-600 text-xs md:text-sm uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs md:text-sm uppercase w-1/5">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs md:text-sm uppercase w-1/5">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs md:text-sm uppercase w-1/5">Total</h3>
            </div>

            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center hover:bg-gray-100 -mx-2 md:mx-0 px-4 md:px-6 py-4 border-b">
                <div className="w-20">
                  <img className="h-24" src={item.image} alt={item.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-red-500 text-xs">{item.brand}</span>
                  <div className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-2">
                    <span className="mr-2" onClick={() => handleDeleteItem(item)}>
                      Remove
                    </span>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <div className="flex items-center">
                    <svg onClick={() => handleRemoveItem(item)} className="fill-current text-gray-600 w-3 cursor-pointer mr-5" viewBox="0 0 448 512">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                    <svg onClick={() => handleAddItem(item)} className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">${item.price.toFixed(2)}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${(item.price * 1).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div id="summary" className="w-full md:w-1/4 px-4 md:px-8 py-8 flex flex-col justify-between">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl border-b pb-4">Order Summary</h1>
              <div className="flex justify-between mt-6 mb-4">
                <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
                <span className="font-semibold text-sm">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
            </div>
            <div className="border-t mt-6">
              <div className="flex font-semibold justify-between py-4 text-sm md:text-base uppercase">
                <span>Total cost</span>
                <span>${(cartItems.reduce((total, item) => total + item.price, 0) + 10).toFixed(2)}</span>
              </div>
              
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm md:text-base text-white uppercase w-full"
                onClick={handleClearCart}
              >
                Checkout
              </button>
              
            </div>
          </div>
        </div>

        {isCheckoutSuccess && (
          <div className="mt-4 p-4 bg-green-200 text-green-800">
            <p>
              Checkout successful! Thank you for your purchase.{' '}
              <Link to="/" className="text-indigo-600 underline hover:text-indigo-800">
                Continue Shopping
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
