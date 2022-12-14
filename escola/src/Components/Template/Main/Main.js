import './Main.css';
import React from 'react';
import Header from '../Header/Header';

export default function Main(props) {
    return (
    <div className="content">
        <Header {...props} />
            <main>
             {props.children}
            </main>
    </div>
    )
}