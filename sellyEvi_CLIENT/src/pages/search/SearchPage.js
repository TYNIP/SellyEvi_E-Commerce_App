import React, {useState} from 'react';
import SearchBar from '../../features/searchBar/SearchBar';
import SearchResultsSpecific from '../../features/searchResults/SearchResultsSpecific';


export default function SearchPage(){
    return(
        <section id='productpage'>
            <div id='NormalSearchBar'>
                <SearchBar/>
            </div>
        <div>
            <SearchResultsSpecific/>
        </div>
        </section>
    );
};