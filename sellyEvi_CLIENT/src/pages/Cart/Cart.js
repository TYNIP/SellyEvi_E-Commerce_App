import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import { checkLoginStatus} from '../../store/auth/authSlice';
import './Cart.css';

function Cart() {

  let { items } = useSelector(state => state.cart);
  console.log(items);
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }
    isLoggedIn();
  }, [dispatch]);

  function calculateTotal() {
    return items.reduce((accumulator, currentValue) => Number(accumulator.total) + Number(currentValue.total));
  };

  if(items.length !== 0){
    return (
      <section className="cart-details-container">
        <p style={{fontSize: 40, color: 'black'}}>Cart</p>
        <div className="cart-info-container">
          {/* CART INFORMATION */}
          <table class="custom-table tableFinal" >
            <th>
              <Typography variant="h6">
                Product Details
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Quantity
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Price p/u
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Total
              </Typography>
            </th>
            {
            items.map(item => {
              return (
                <CartItemCard {...item} />
              )
            })
          }
      </table>
  
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
                <Typography>Cart Id: {`${items[0].cart_id}`}</Typography>
              </div>
              <div className="order-line-item">
                <Typography>Subtotal: {calculateTotal()} USD</Typography>
              </div>
              <div className="order-line-item">
                <Typography>Shipping: FREE</Typography>
              </div>
              <br/>
              <Divider className="checkout-divider"/>
              <br/>
              <div className="order-line-item">
                <Typography>Total: {calculateTotal()} USD</Typography>
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
  }else{
    return (
      <section className="cart-details-container">
        <p style={{fontSize: 40, color: 'black'}}>Cart</p>
        <div className="cart-info-container">
          {/* CART INFORMATION */}
          <table class="custom-table tableFinal" >
            <th>
              <Typography variant="h6">
                Product Details
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Quantity
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Price p/u
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Total
              </Typography>
            </th>
      </table>
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
                <Typography>Cart Id: Add Products To Get A Cart</Typography>
              </div>
              <div className="order-line-item">
                <Typography>Subtotal: 0</Typography>
              </div>
              <div className="order-line-item">
                <Typography>Shipping: FREE</Typography>
              </div>
              <br/>
              <Divider className="checkout-divider"/>
              <br/>
              <div className="order-line-item">
                <Typography>Total: 0</Typography>
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
}

export default Cart;
