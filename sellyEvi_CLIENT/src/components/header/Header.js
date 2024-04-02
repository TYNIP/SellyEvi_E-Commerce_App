import {React} from 'react';
import {Link} from 'react-router-dom';
import './header.css';

export default function Header({sideBar}){
    return(
    <div id='firstHeader'>
        <div className="headerActions">
            <i className="fas fa fa-bars fa-fw" onClick={sideBar}></i>
        </div>
        <Link to='/home'>
            <h1>SellyEvi</h1>
        </Link>
        <div className="headerActions">
            <i className="fas fa fa-user-circle fa-fw" ></i>
            <i className="fas fa fa-shopping-cart fa-fw" ></i>
        </div>
    </div>
    );
};