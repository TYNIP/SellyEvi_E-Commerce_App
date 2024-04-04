import {React} from 'react';
import './footer.css';
import {API_URL} from '../../apis/functions';

export default function Footer(){
    return (
        <div id='footer'>
            <span>©SellyEvi 2024 | Fictional Page | Academic Project | Not Related To Any Organization | <a href={`${API_URL}/docs`} target='_blanck'>Documentation</a></span>
        </div>
    );
}