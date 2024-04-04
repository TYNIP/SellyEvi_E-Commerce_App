import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate, useLocation} from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from '../pages/home/HomePage';
import ProductPage from '../pages/products/ProductPage';
import ProductDetailsPage from '../pages/Productdetails/ProductDetailsPage';
import SearchPage from '../pages/search/SearchPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ErrorPage from '../pages/notFound/Error'

/* SCROLL */
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}


function App() {
  /* ROUTER */
  const router = createBrowserRouter(createRoutesFromElements(
    <>

    <Route path='/' element={
      <>
      <ScrollToTop />
      <AppLayout/>
      </>
    }>

      {/* ROUTES */}

      <Route index element={ <Navigate to="/home"/> }/>
      <Route path="home" element={<HomePage />}/>
      <Route path="products" element={<ProductPage/>}/>
      <Route path="products/:id/:productname" element={<ProductDetailsPage/>}/>
      <Route path="products/search" element={<SearchPage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>

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