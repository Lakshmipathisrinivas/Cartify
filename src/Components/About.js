import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-100 h-screen flex items-center justify-center">
      <div className="container px-5 py-12 lg:py-24 mx-auto flex flex-col items-center justify-center">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to E-Commerce Journey
          </h1>
          <p className="mb-4 text-base lg:text-lg leading-relaxed">
            Your go-to destination for a delightful shopping experience! Explore a curated collection of quality products from the comfort of your home.
          </p>
          <div className="flex justify-center">
            <Link to='/'>
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
