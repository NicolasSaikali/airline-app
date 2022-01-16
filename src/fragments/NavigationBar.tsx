import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'

export const NavigationBar = () => (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} width="150" className="d-inline-block align-top" alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                <ul className="navbar-nav d-flex">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Flights</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/hotels">Hotels</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-trips">My Trips</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </Router>
)