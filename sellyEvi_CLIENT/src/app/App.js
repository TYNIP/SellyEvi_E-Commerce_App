import React, {useEffect} from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from './AppLayout';
import HomePage from '../pages/home/HomePage';
import ProductPage from '../pages/products/ProductPage';
import ProductDetailsPage from '../pages/Productdetails/ProductDetailsPage';
import SearchPage from '../pages/search/SearchPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ErrorPage from '../pages/notFound/Error'

import Orders from '../pages/Orders/Orders';

import Account from '../pages/Account/Account';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';/*  */
import OrderDetails from '../pages/Orderdetails/OrderDetails';

import { checkLoginStatus, authSelector, userSelector } from '../store/auth/authSlice';

/* SCROLL */
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;

}

/* APP */
function App() {

  const isAuthenticated = useSelector(authSelector);
  const userInfo = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }
    isLoggedIn();
  }, [dispatch]);

  /* ROUTER */
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={
      <>
      <ScrollToTop />
      <AppLayout isAuthen={isAuthenticated} userInfo={userInfo}/>
      </>
    }>

      {/* PUBLIC ROUTES */}
      <Route index element={ <Navigate to="/home"/> }/>
      <Route path="home" element={<HomePage userInfo={userInfo}/>}/>
      <Route path="products" element={<ProductPage/>}/>
      <Route path="products/:id/:productname" element={<ProductDetailsPage/>}/>
      <Route path="products/search" element={<SearchPage/>}/>
      <Route path="login" element={isAuthenticated? <Navigate to="/home"/> : <Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="orders" element={<Orders/>}/>
      
      {/* PRIVATE ROUTES */}
      <Route exact path='/account' element={isAuthenticated? <Account userInfo={userInfo}/> : <Navigate to="/login"/>}/>
      <Route exact path='/cart' element={isAuthenticated? <Cart/> : <Navigate to="/login"/>}/>
      <Route exact path='/checkout' element={isAuthenticated? <Checkout/> : <Navigate to="/login"/>}/>
      <Route exact path='/orders' element={isAuthenticated? <Orders/> : <Navigate to="/login"/>}/>
      <Route exact path='/orders/:orderId' element={isAuthenticated? <OrderDetails/> : <Navigate to="/login"/>}/>

      {/* FAIL */}
      <Route path='*' element={<ErrorPage/>} />

    </Route>
     </>
  )
  );
  
  return (
    <RouterProvider router={router} basename='/*'/>
  );
}

export default App;