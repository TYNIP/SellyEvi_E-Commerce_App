import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import './Cart.css';

function Cart() {

  const { items } = useSelector(state => state.cart);

  /* function calculateTotal() {
    return items.reduce((total, { price, qty }) => {
      return total += price * qty / 100
    }, 0 )
  } */

  return (
    <section className="cart-details-container">
      <p style={{fontSize: 40, color: 'black'}}>Cart</p>
      <div className="cart-info-container">
        <div className="cart-info-header">
          <div className="details">
            <Typography variant="h6">
              Product Details
            </Typography>
          </div>
          <div className="qty">
            <Typography variant="h6">
              Qty
            </Typography>
          </div>
          <div className="price">
            <Typography variant="h6">
              Total
            </Typography>
          </div>
        </div>
        {/* {
          items.map(item => {
            return (
              <CartItemCard {...item} />
            )
          })
        } */}
      </div>
      <div className="cart-summary-container">
        <div className="cart-summary-container-inner">
          <Divider className="checkout-divider"/>
          <div className="order-summary-container">
            <br/>
            <Typography variant="h6">
              Order Summary
            </Typography>
            <br/>
            <div className="order-line-item">
              <Typography>Subtotal</Typography>
              {/* <Typography>{calculateTotal()}</Typography> */}
            </div>
            <div className="order-line-item">
              <Typography>Shipping: FREE</Typography>
            </div>
            <br/>
            <Divider className="checkout-divider"/>
            <br/>
            <div className="order-line-item">
              <Typography>Total</Typography>
             {/*  <Typography>{calculateTotal()}</Typography> */}
            </div>
          </div>
        </div>
      </div>
      <div className='btncheck'>
          <Button
            variant="contained"
            color="primary"
            className="checkout-btn"
            component={Link}
            to="/checkout"
          >Checkout</Button>
        </div>
    </section>
  );
}

export default Cart;
