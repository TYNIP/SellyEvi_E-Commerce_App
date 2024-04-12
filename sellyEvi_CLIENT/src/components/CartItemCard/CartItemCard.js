import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Incrementer from '../incrementer/Incrementer';
import { removeItem, updateItem } from '../../store/cart/cartSlice';
import {convertImageBufferToUrl} from '../../apis/functions';
import { checkLoginStatus} from '../../store/auth/authSlice';
import './CartItemCard.css';

function CartItemCard(props) {
  const products = props;
  const { cartItemId, name, price, quantity, total, id, images} = props;
  const [ qty, setQty ] = useState(quantity);
  const [edit, setEdit] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);


  const dispatch = useDispatch();

  /* image */
  useEffect(() => {
    const fetchImageUrls = async () => {
      if (products && Array.isArray(products.images)) {
        const urls = await await convertImageBufferToUrl(products.images);
        setImageUrls(urls);
        };
    };
    fetchImageUrls();
  }, [products]);

  function handleIncrement() {
    setQty(qty + 1);
  }

  function handleDecrement() {
    if (qty === 1) {
      return;
    }
    setQty(qty - 1);
  }

  function editable(){
    setEdit(!edit);
  }

  async function update() {
    if(qty===quantity){
      setEdit(!edit);
    }else{
      await dispatch(updateItem({cartItemId: products.id, qty: qty}));
      await dispatch(checkLoginStatus());
      setEdit(!edit);
    }
  }
  async function deleteProduct(){
    await dispatch(removeItem(products.id));
    await dispatch(checkLoginStatus());
    setEdit(!edit);
  }

  return (
    <>
    <tr id='tableres'>
        <td className='tablew'>
          <div className="cart-item-details">
            <div className='imgFinalContainer'>
                <img src={imageUrls} alt={products.name}/>
            </div>
            <Link to={`/products/${id}/${name}`}>
              <p>{name}</p>
            </Link>
          </div>
        </td>

        <td>
        <div className="cart-item-interact">

        {!edit && (
            <>
              <p>{quantity}</p>
            <div className='thefinalbutton'>
              <Button
                variant="contained"
                color="primary"
                className="checkout-btn"
                onClick={editable}
              >Edit Qty</Button>
            </div>
            </>
          )}

          {edit && (
            <>
              <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={qty}
            />
            <div className='thefinalbutton'>
              <Button
                variant="contained"
                color="primary"
                className="checkout-btn"
                onClick={update}
              >Save Changes</Button>
            </div>
            <div className='thefinalbutton'>
              <Button
                variant="contained"
                color="primary"
                className="checkout-btn"
                onClick={deleteProduct}
              >Delete Product</Button>
            </div>
            </>
          )}

        </div>
        </td>

        <td>
        <div className="cart-item-price">
          <p>{price} USD</p>
        </div>
        </td>

        <td>
        <div className="cart-item-price">
          <p>{total} USD</p>
        </div>
        </td>
    </tr>
      <Divider />
    </>
  );
}

export default CartItemCard;
