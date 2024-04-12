import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import {convertImageBufferToUrl} from '../../apis/functions';
import '../CartItemCard/CartItemCard.css';

function CartItemCard(props) {
  const products = props;
  const { name, price, quantity, id, images} = props;
  const [imageUrls, setImageUrls] = useState([]);

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
            <p>{quantity}</p>
        </div>
        </td>

        <td>
        <div className="cart-item-price">
          <p>{price} USD</p>
        </div>
        </td>

        <td>
        <div className="cart-item-price">
          <p>{quantity*price} USD</p>
        </div>
        </td>
    </tr>
      <Divider />
    </>
  );
}

export default CartItemCard;
