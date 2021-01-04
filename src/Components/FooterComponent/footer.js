import React from 'react';
import { Link } from 'react-router-dom'
import './footer.css';

export default function Footer() {
    return(
        <div className='footer'>
            <Link to='/'>Home</Link>
            <Link to='/movie-roulette'>Roulette</Link>
            <Link to="/your-movies">Your Movies</Link>
        </div>
    )
}