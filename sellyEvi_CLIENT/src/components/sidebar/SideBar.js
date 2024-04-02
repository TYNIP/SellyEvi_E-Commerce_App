import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchLatestProducts, fetchOldestProducts } from '../../store/product/productSlice';
import './sidebar.css';

const Sidebar = ({ userName, sideBar }) => {
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

  const handleLatestProducts = () => {
    dispatch(fetchLatestProducts());
    sideBar();
  };

  const handleOldestProducts = () => {
    dispatch(fetchOldestProducts());
    sideBar();
  };

  return (
    <section id='sidePage'>

    <div id="sidebar">
        <i className="fas fa fa-redo fa-fw" onClick={sideBar}></i>
      <div id='insideBar'>
        <p>{greeting} <br/> {userName ? `Welcome back ${userName}` : 'Welcome Stranger'}</p>
        {!userName && (<Link to='/login' onClick={sideBar}><span className='link'>Log In</span></Link>)}
        <h1>SellyEvi</h1>
        <button onClick={handleLatestProducts}>Latest Products</button>
        <button onClick={handleOldestProducts}>Oldest Products</button>
      </div>
    </div>

    <div id='darkness' onClick={sideBar}>hello</div>

    </section>
  );
};

export default Sidebar;
