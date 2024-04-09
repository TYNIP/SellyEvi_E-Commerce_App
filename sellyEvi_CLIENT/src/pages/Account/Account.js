import React from 'react'
import {Link} from 'react-router-dom';
import './Account.css';

function Account({userInfo}) {
  return (
    <section id='account'>
      <div id='accounInfo'>
        <h2>Account Information</h2>
        <div className='ai2'>
        <p>First Name: {`${userInfo.firstname}`}</p>
        <p>Last Name: {`${userInfo.lastname}`}</p>
        <p>Email: {`${userInfo.email}`}</p>
        <p>User Id: {`${userInfo.id}`}</p>
        <p>User Created: {`${userInfo.created}`}</p>
        </div>
        <Link to='/cart' className='btnact'>Check your Cart</Link>
        <br/>
        <Link to='/orders' className='btnact'>Check your Orders</Link>
      </div>
    </section>
  );
}

export default Account;
