import React from 'react'
import MovieProfileNav from './movieProfileNav';

import './profile.css'

class MovieProfile extends React.Component {
    render() {
        return(
        <div className="profile">
            <MovieProfileNav path={this.props.path}/>
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
    
}

export default MovieProfile;