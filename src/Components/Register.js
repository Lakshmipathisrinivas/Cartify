import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { handleSetLoggedIn } = useContext(AuthContext);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
        }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        handleSetLoggedIn(true, data.user);
        navigate("/"); // Use navigate from useNavigate hook to navigate to the homepage
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  
  

  return (
    <section className="bg-secondary-50 dark:bg-secondary-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" autoComplete="on">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white">Full Name</label>
                <input type="text" name="fullName" id="fullName" autoComplete="name" className="bg-secondary-50 border border-secondary-300 text-secondary-900 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" autoComplete="email" className="bg-secondary-50 border border-secondary-300 text-secondary-900 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-secondary-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" autoComplete="new-password" placeholder="••••••••" className="bg-secondary-50 border border-secondary-300 text-secondary-900 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-secondary-300 rounded bg-secondary-50 focus:ring-3 focus:ring-secondary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-secondary-500 dark:text-secondary-300">I accept the Terms and Conditions</label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800"
                onClick={(e) => handleRegisterUser(e)}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-secondary-500 dark:text-secondary-400">
                Already have an account? <Link to="/login" className="font-medium text-secondary-600 hover:underline dark:text-secondary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
