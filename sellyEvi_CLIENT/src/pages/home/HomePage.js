import {React} from 'react';
import './homepage.css';
import SearchBar from '../../features/searchBar/SearchBar';

export default function HomePage(){
    return(
        <section id='homepage'>
        <div id='welcome'>
            <h2>What are we looking today?</h2>
            <SearchBar/>
        </div>
        </section>
    );
};