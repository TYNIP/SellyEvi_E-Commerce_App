import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Incrementer from '../../components/incrementer/Incrementer';
import { createItem, addItem, statusSelector, msgSelector} from '../../store/cart/cartSlice';
import {authSelector} from '../../store/auth/authSlice';
import Notifications from '../../components/notifications/Notifications';
import './btn.css';

export default function AddCartBtn({product}){
    const isAuthenticated = useSelector(authSelector);
    const status = useSelector(statusSelector);
    const msg = useSelector(msgSelector);
    const navigate = useNavigate();
    const [ quantity, setQuantity ] = useState(1);
    const [valid, setValid] = useState(false);
    const dispatch = useDispatch();

    /* INCREMENTER */
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
      /* ADD ITEM */
      async function handleAddToCart() {
        if(isAuthenticated){
          console.log('firt')
          await dispatch(createItem({product}));
          console.log('second')
          await dispatch(addItem({product, quantity}));
          setValid(true)
          setTimeout(()=>{
            setValid(false);
          }, 4000);
          console.log('api done');
        } else {
          navigate('/login');
        }
      }

      /* ERROR */
      function notAvailable(){
        if(isAuthenticated){
        alert('Product Not Available For The Moment');
        } else {
          navigate('/login');
        }
      }

    return(
      <>
        <div id='addCart'>
        <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={quantity}
            />
        <button className="btn" onClick={product.available ? handleAddToCart:notAvailable}>
              <span className="btn__visible">Add To Cart</span>
              <span className="btn__invisible">{product.available ? 'Available' : 'Not Available'}</span>
        </button>
        <br/>
        </div>
        {(status && valid) && (<Notifications notMsg={msg}/>)}
      </>
    );
}