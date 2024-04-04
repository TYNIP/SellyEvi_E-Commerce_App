import {React, useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
/* COMPONENTS */
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function AppLayout() {
    const [isSideBar, setSideBar] = useState(false);
    /* NAVIGATION */
    const sideBar = () => {
        setSideBar(!isSideBar);
    };

    return (
    <>
    {/* GO TO */}
    <div id="top"></div>
    {/* APPLAYOUT */}
    {isSideBar && (
        <SideBar sideBar={sideBar}/>
    )}
    <Header sideBar={sideBar}/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>
    );
};