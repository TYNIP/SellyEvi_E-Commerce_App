import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Incrementer from '../../components/incrementer/Incrementer';
import { createItem, addItem } from '../../store/cart/cartSlice';
import {authSelector} from '../../store/auth/authSlice';
import './btn.css';

export default function AddCartBtn({product}){
    const isAuthenticated = useSelector(authSelector);
    const navigate = useNavigate();
    const [ quantity, setQuantity ] = useState(1);
    const dispatch = useDispatch();
    function handleIncrement() {
        if (quantity === 10) {
            return;
          }

        setQuantity(quantity + 1);
      }
    
      function handleDecrement() {
        if (quantity === 1) {
          return;
        }
        setQuantity(quantity - 1);
      }
      async function handleAddToCart() {
        if(isAuthenticated){
          console.log('firt')
          await dispatch(createItem({product}));
          console.log('second')
          await dispatch(addItem({product, quantity}));
          console.log('api done');
        } else {
          navigate('/login');
        }
      }

    return(
        <div id='addCart'>
        <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={quantity}
            />
        <button className="btn" onClick={handleAddToCart}>
              <span className="btn__visible">Add To Cart</span>
              <span className="btn__invisible">{product.available ? 'Available' : 'Not Available'}</span>
        </button>
        </div>
    );
}