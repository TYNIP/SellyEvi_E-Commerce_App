import {React} from 'react';
import './productPage.css';
import SearchBar from '../../features/searchBar/SearchBar';
import SearchResults from '../../features/searchResults/SearchResults';

export default function ProductPage(){
    return(
        <section id='productpage'>
            <div id='NormalSearchBar'>
                <SearchBar/>
            </div>
        <div>
            <SearchResults />
        </div>
        </section>
    );
};