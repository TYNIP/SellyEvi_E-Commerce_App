import React, {useEffect, useState} from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate, useLocation} from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from '../pages/home/HomePage';
import Login from '../pages/Login/Login';
import ErrorPage from '../pages/notFound/Error';


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
      <Route path="home" element={<HomePage/>}/>
      <Route path="login" element={<Login/>}/>

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