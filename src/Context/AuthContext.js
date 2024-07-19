import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSetLoggedIn = async (value, user) => {
    setLoggedIn(value);

    // Fetch the username when the user logs in
    if (value) {
      try {
        // Set the username directly from the user object
        setUserName(user.fullName);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }
  };
  

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName(''); // Clear the username on logout
    // Additional logout actions (e.g., clearing local storage)
  };

  const fetchUserName = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('User is not logged in');
        return null;
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        return userInfo.fullName; // Assuming the full name is part of the user information
      }
      
      else {
        console.error('Error fetching user info:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleSetLoggedIn, handleLogout, userName, fetchUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
