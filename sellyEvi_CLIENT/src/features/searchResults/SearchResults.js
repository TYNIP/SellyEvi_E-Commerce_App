import React from 'react';
import { useSelector } from 'react-redux';
import { selectProduct, selectLoading, selectError } from '../redux/productSlice';

const SearchResults = () => {
  const product = useSelector(selectProduct);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div id="results">
      {loading && <div class="loader"></div>}
      {error && <p>Error: {error}</p>}
      {product ? (
        <div>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <p>Availability: {product.availability}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ) : (
        <h3>No product found</h3>
      )}
    </div>
  );
};

export default SearchResults;
