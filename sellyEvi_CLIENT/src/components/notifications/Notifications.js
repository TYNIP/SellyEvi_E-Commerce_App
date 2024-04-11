import {React, useState} from 'react';
import './not.css';


export default function Notification({notMsg}){
    return(
        <section id='notifications'>
            <p>{notMsg}</p>
        </section>
    )
};