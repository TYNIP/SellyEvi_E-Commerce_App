import {React} from 'react';
import './footer.css';
import {API_URL} from '../../apis/functions';

export default function Footer(){
    return (
        <div id='footer'>
            <span>©SellyEvi 2024 | Developed By:<a href='https://artmoram.com/' target='_blanck'>TYNIP</a> | Fictional Page | Academic Project | Not Related To Any Organization | All Rights To The Images Belong To Their Respective Authors. | <a href={`${API_URL}/docs`} target='_blanck'>Documentation</a></span>
        </div>
    );
}