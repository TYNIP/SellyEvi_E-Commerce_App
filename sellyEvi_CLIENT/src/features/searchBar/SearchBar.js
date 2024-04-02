import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../../store/product/productSlice';
import './searchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      dispatch(fetchProduct(searchTerm));
    }
  };

  return (
    <div id="search">
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
