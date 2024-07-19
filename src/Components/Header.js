import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { search, setSearch, updateSearchResults, products } = useContext(DataContext);
  const cartItems = useSelector((store) => store.cart.items);

  const { isLoggedIn, handleLogout, userName } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Call the handleLogout function from AuthContext
    handleLogout();
    // Redirect to the home page or login page
    navigate('/');
  };

  const handleSearchChange = (e) => {
    
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    try {
      if (search.trim() !== '') {
        const results = await performSearch(search);
        updateSearchResults(results);
      } else {
        // If the search is empty, show all products
        updateSearchResults(products);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      // Clear the search input
      setSearch('');
    }
  };

  const performSearch = async (searchTerm) => {
    // Replace this with your actual search logic
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {windowWidth > 1023 && (
          <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-2-8h4m-4 4h4m-4 4h4M8 12h3"></path>
          </svg>
          <span className="ml-3 text-xl font-semibold">Cartify</span>
        </Link>
        
        
        
        
        )}

        <div className="flex flex-row md:items-center md:ml-auto">
          <div className={`flex items-center ${windowWidth <= 767 ? 'mb-4 md:mb-0' : ''}`}>
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              className="bg-indigo-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-indigo-600 focus:outline-none"
              onClick={handleSearchButtonClick}
            >
              Search
            </button>
          </div>
        </div>

        {/* Responsive */}
        <div className="md:flex md:items-center ml-auto">
          <div className="md:hidden ml-auto mb-4 md:mb-0">
            <button
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
              onClick={handleDropdownToggle}
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                {showDropdown ? <path d="M6 18L18 6M6 6l12 12"></path> : <path d="M4 6h16M4 12h16m-7 6h7"></path>}
              </svg>
            </button>
          </div>
        </div>

        <div className={`w-full md:w-auto md:flex md:items-center md:ml-auto ${showDropdown ? 'block' : 'hidden'}`}>
          <ul className={`md:flex md:ml-auto md:mr-auto flex flex-col ${windowWidth > 767 ? 'md:flex-row' : 'items-center'} text-base justify-center`}>
            <li className="mb-3 mr-3 md:mb-0">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-3 mr-3 md:mb-0">
              <Link to="/category">Category</Link>
            </li>
            <li className="mb-3 mr-3 md:mb-0">
            <Link to="/cart" className="relative group">
            <span className="inline-flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Cart
            </span>
            {cartItems.length > 0 && (
              <span className="badge bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1 -translate-y-1 opacity-100 transition-opacity duration-300">
                {cartItems.length}
              </span>
            )}
          </Link>
            </li>
            <li className="mb-3 mr-5 md:mb-0">
              <Link to="/about">About</Link>
            </li>
          </ul>

          {/* Improved styling for the username */}
          <div className="relative md:ml-4 flex items-center">
            <div
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer"
            >
              {isLoggedIn ? (
                <>
                  <span className="text-md font-bold text-indigo-600">{userName}</span>

                  
                </>
              ) : (
                <>
                  <span className="mr-1">Login</span>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </>
              )}
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-md">
                  {isLoggedIn ? (
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogoutClick}>
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Login
                      </Link>
                      <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
