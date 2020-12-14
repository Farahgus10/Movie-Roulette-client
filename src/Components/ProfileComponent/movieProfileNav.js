import React from 'react';
import {Link} from 'react-router-dom';


function MovieProfileNav() {
    return(
        <div className="nav">
            <h1>Your Movies</h1>

            <div className="nav-bar">
                <Link to="/your-movies">Your Movies</Link>
                <Link to="/movie-profile">Movie Profile</Link>
            </div>
        </div>
    )
}

export default MovieProfileNav;