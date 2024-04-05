import {React, useState} from 'react';
import {Outlet} from 'react-router-dom';
/* COMPONENTS */
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function AppLayout({isAuthen, userName}) {
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
        <SideBar sideBar={sideBar} isAuthen={isAuthen} userName={userName}/>
    )}
    <Header sideBar={sideBar}/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>
    );
};