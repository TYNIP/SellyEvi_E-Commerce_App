import {React} from 'react';
import './productDetailsPage.css';
import SearchResults from '../../features/searchResults/SearchResults';
import SearchBar from '../../features/searchBar/SearchBar';
import Product from '../../components/product/Product';
import './productDetailsPage.css';

export default function ProductDetailsPage(){
    return(
        <section id='productpage'>
            <div id='NormalSearchBar'>
                <SearchBar/>
            </div>
            <div>
                <Product/>
            </div>
            <div className='largeCenter'>
                <h2>Latest Products</h2>
            </div>
            <div>
              <SearchResults isLatest={false} isOldest={false} isAll={true}/>
            </div>
        </section>
    );
};