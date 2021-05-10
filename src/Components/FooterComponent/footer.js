import React from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../../Services/Token-service'
import './footer.css';

export default function Footer(props) {
    function renderFooter() {
        return (
            <div className='footer'>
            {/* <Link to='/'>Home</Link> */}
            <Link to='/movie-roulette' style={props.path =='/movie-roulette' ? {fontWeight:"bold"} : {color:"normal"}}>Roulette</Link>
            <Link to="/your-movies" style={props.path =='/your-movies' ? {fontWeight:"bold"} : {color:"normal"}}>Your Movies</Link>
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