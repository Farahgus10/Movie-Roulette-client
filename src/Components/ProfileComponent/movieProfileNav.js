import React from 'react';
import {Link} from 'react-router-dom';


class MovieProfileNav extends React.Component {
    render() {
        return(
            <div className="nav">
                <h1>Your Movies</h1>

                <div className="nav-bar">
                    <Link to="/your-movies" style={this.props.path.pathname=='/your-movies' ? {fontWeight:"bold"} : {color:"normal"}}>Your Movies</Link>
                    <Link to="/movie-profile" style={this.props.path.pathname=='/movie-profile' ? {fontWeight:"bold"} : {color:"normal"}}>Movie Profile</Link>
                </div>
            </div>
        )
    }
    
}

export default MovieProfileNav;