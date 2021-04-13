import React from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../../Services/Token-service'
import './footer.css';

export default function Footer() {

    function renderFooter() {
        return (
            <div className='footer'>
            <Link to='/'>Home</Link>
            <Link to='/movie-roulette'>Roulette</Link>
            <Link to="/your-movies">Your Movies</Link>
        </div>
        )
    }

    return(
        <div>
            {TokenService.getAuthToken() 
                ? renderFooter()
                : " "
            }
        </div>
    )
}