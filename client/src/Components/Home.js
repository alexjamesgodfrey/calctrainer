import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';

export default function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p style={{ zIndex: 10}}>
                    welcome to calctrainer.io
                </p>
                <Link style={{ zIndex: 10}} className="App-link" to="/problems">begin</Link>
            </header>
        </div>              
    )
}
