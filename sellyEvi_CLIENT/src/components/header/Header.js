import {React} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './header.css';
import {logoutUser} from '../../store/auth/authSlice';
import { useDispatch} from 'react-redux';


export default function Header({sideBar, isAuthen}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(logoutUser());
        navigate('/login');
        navigate('/login');
    }

    return(
    <div id='firstHeader'>
        <div className="headerActions">
            <i className="fas fa fa-bars fa-fw" onClick={sideBar}></i>
        </div>
        <Link to='/home'>
            <h1>SellyEvi</h1>
        </Link>
        <div className="headerActions">
            <Link to='/account'><i className="fas fa fa-user-circle fa-fw" ></i></Link>
            <Link to='/cart'><i className="fas fa fa-shopping-cart fa-fw" ></i></Link>
            <div>
                {isAuthen && (<button id='LogOutbtn' onClick={logout}>Log Out</button>)}
                {!isAuthen && (<Link to='/login'><button id='LogOutbtn'>Log In</button></Link>)}
            </div>
        </div>
    </div>
    );
};