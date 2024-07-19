import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import useOnline from './CustomHook/useOnline';
import Loading from './Components/Loading';
import Offline from './Components/Offline';
import Register from './Components/Register';
import { DataProvider } from './Context/DataContext';
import ProductCardDetails from './Components/ProductCardDetails';
import appStore from './Redux/appStore';


const Home = lazy(() => import('./Components/Home'));
const Error404 = lazy(() => import('./Components/Error404'));
const About = lazy(() => import('./Components/About'));
const Cart = lazy(() => import('./Components/Cart'));
const Login = lazy(() => import('./Components/Login'));
const Category = lazy(() => import('./Components/Category'));

function App() {
  const isOnline = useOnline();

  return (
    <div className='App' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Provider store={appStore}>
        <DataProvider>
          <Header />
          <Suspense fallback={<Loading />}>
            {!isOnline ? (
              <Offline />
            ) : (
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/category' element={<Category />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/product/:id' element={<ProductCardDetails />} />
                <Route path='*' element={<Error404 />} />
              </Routes>
            )}
          </Suspense>
          <Footer />
        </DataProvider>
      </Provider>
    </div>
  );
}

export default App;
