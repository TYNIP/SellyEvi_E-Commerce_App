import {React} from 'react';
import './homepage.css';
import SearchBar from '../../features/searchBar/SearchBar';
import SearchResults from '../../features/searchResults/SearchResults';

export default function HomePage({userInfo}){
    return(
        <section id='homepage'>
        <div id='welcome'>
            <h2>{userInfo? `What are we looking today ${userInfo.user.firstname}?` : `What are we looking today?`}</h2>
            <SearchBar/>
        </div>
        <div className='largeCenter'>
            <h2>Latest Products</h2>
        </div>
        <div style={{width:'100%'}}>
            <SearchResults isLatest={true} isOldest={false} isAll={false}/>
        </div>
        </section>
    );
};