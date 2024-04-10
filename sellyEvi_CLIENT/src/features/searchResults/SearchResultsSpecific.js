import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { selectProductId, selectLoadingId, selectErrorId} from '../../store/product/productSliceSpecific';
import {convertImageBufferToUrl} from '../../apis/functions';
import './searchResults.css';
import CartButton from '../addToCartBtn/AddBtn';

// Import statements

const SearchResultsSpecific = () => {
  const products = useSelector(selectProductId);
  const loading = useSelector(selectLoadingId);
  const error = useSelector(selectErrorId);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (products && Array.isArray(products)) {
        const urls = await Promise.all(products.map(async (product) => {
          const imageUrl = await convertImageBufferToUrl(product.images);
          return imageUrl;
        }));
        setImageUrls(urls);
      }
    };
    fetchImageUrls();
  }, [products]);

  return (
    <div id="results">
      {/* Loading indicator */}
      {loading &&(
        <ul style={{ width: '100%', textAlign: 'center' }} className="wave-menu">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      )}

      {/* Error message */}
      {error && <p style={{ width: '100%', textAlign: 'center' }}>Error: {error}</p>}

      {/* Render products */}
      {Array.isArray(products) && products.map((product, index) => (
        <>
        <Link to={`/products/${product.id}/${product.name}`} key={index}>
          <div className='post'>
            <div className='imgContainer'>
              <img src={imageUrls[index]} alt={product.name} />
            </div>
            <div className='info'>
              <h3>{product.name.toUpperCase()}</h3>
              <p>Price: {product.price} USD</p>
            </div>
            <CartButton product={product}/>
          </div>
        </Link>
        </>
      ))}
    </div>
  );
};

export default SearchResultsSpecific;