import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import ProductCard from './ProductCard';
import Shimmer from './Shimmer';

const Home = () => {
  const { search, products, searchResults, isLoading } = useContext(DataContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const shimmerCount = 10; // Set your desired shimmer count

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  //const displayProducts = search.length > 0 ? searchResults : sampleProd;


  const isMobile = windowWidth <= 768;

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className={` flex flex-wrap gap-4 w-full -m-4 ${isMobile ? 'flex-col' : ''}`}>
          {isLoading ? (
            // Show shimmer or loading indicator here
            <Shimmer count={shimmerCount} />
          ) : (
            // Render ProductCard components
            <ProductCard isMobile={isMobile}/>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
