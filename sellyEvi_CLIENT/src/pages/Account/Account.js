import React from 'react'
import {Link} from 'react-router-dom';
import './Account.css';

function Account({userInfo}) {
  return (
    <section id='account'>
      <div id='accounInfo'>
        <h2>Profile</h2>
        <p>Your account information</p>
        <div className='ai2'>
        <table class="custom-table">
        <tr>
            <td>First Name:</td>
            <td>{`${userInfo.user.firstname}`}</td>
        </tr>
        <tr>
            <td>Last Name:</td>
            <td>{`${userInfo.user.lastname}`}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>{`${userInfo.user.email}`}</td>
        </tr>
        <tr>
            <td>User Id:</td>
            <td>{`${userInfo.user.id}`}</td>
        </tr>
        <tr>
            <td>User Created:</td>
            <td>{`${userInfo.user.created}`}</td>
        </tr>
    </table>
        </div>
        <Link to='/cart' className='btnact'>Check your Cart</Link>
        <br/>
        <Link to='/orders' className='btnact'>Check your Orders</Link>
      </div>
    </section>
  );
}

export default Account;
