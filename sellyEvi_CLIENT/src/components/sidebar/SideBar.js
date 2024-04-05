import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchLatestProducts, fetchOldestProducts, fetchAllProduct } from '../../store/product/productSliceGeneral';
import './sidebar.css';

const Sidebar = ({ userName , isAuthen, sideBar }) => {
  const dispatch = useDispatch();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setGreeting('Good morning!');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon!');
    } else {
      setGreeting('Good night!');
    }
  }, []);
  const handleAllProducts = () => {
    dispatch(fetchAllProduct());
    sideBar();
  };

  const handleLatestProducts = () => {
    dispatch(fetchLatestProducts());
    sideBar();
  };

  const handleOldestProducts = () => {
    dispatch(fetchOldestProducts());
    sideBar();
  };
  console.log(isAuthen);
  return (
    <section id='sidePage'>

    <div id="sidebar">
        <i className="fas fa fa-redo fa-fw" onClick={sideBar}></i>
      <div id='fixSideBar'>
      <div id='insideBar'>
        <p>{greeting} <br/> {isAuthen? `Welcome back ${userName}` : 'Welcome Stranger'}</p>
        {!isAuthen && (<Link to='/login' onClick={sideBar}><span className='link'>Log In</span></Link>)}
        <h1>SellyEvi</h1>
        <Link to='/products'><button onClick={handleAllProducts}>All Products</button></Link>
        <Link to='/products'><button onClick={handleLatestProducts}>Latest Products</button></Link>
        <Link to='/products'><button onClick={handleOldestProducts}>Oldest Products</button></Link>
      </div>
      </div>
    </div>

    <div id='darkness' onClick={sideBar}></div>

    </section>
  );
};

export default Sidebar;
