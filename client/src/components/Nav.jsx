import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div id="nav-container">
            <div>
                <Link className="header-link" to="/"><h1>Today I Learned:</h1></Link>
                <h4>A place to log daily learned things...</h4>
            </div>
            <nav >
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/fact">Facts</Link>
                <Link className="nav-link" to="/searchPage">Search</Link>
            </nav>

        </div>
    )
}
