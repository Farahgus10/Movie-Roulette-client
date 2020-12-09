import React from 'react-router-dom'
import MovieProfileNav from './movieProfileNav';

import './profile.css'

function MovieProfile() {
    return(
        <div className="profile">
            <MovieProfileNav />
            <p className="profile-title">*Username's* Movie Profile</p>

            <div className="info">
                <div className="genre">
                    <p><b>Movie Genres:</b></p>
                    <p>bla,h blah, blah</p>
                </div>
                
                <div className="actor">
                    <p><b>Actor:</b></p>
                    <p>blah, blah, blah</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default MovieProfile;