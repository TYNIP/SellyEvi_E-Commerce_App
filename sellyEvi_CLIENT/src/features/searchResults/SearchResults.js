import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { selectProduct, selectLoading, selectError, fetchAllProduct, fetchLatestProducts, fetchOldestProducts} from '../../store/product/productSliceGeneral';
import {convertImageBufferToUrl} from '../../apis/functions';
import CartButton from '../addToCartBtn/AddBtn';
import './searchResults.css';

// Import statements

const SearchResults = ({isLatest, isOldest, isAll}) => {
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
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

  useEffect(()=>{
    if(isLatest === true){
      dispatch(fetchLatestProducts());
    }
    if(isOldest === true){
      dispatch(fetchOldestProducts());
    }
    if(isAll === true){
      dispatch(fetchAllProduct());
    }
  },[dispatch]);

  return (
    <div id="results">
      {/* Loading indicator */}
      {loading && (
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
      ))}
    </div>
  );
};

export default SearchResults;
