import React from 'react'
import {Link} from 'react-router-dom'
import MovieProfileNav from './movieProfileNav';
import ProfileService from '../../Services/Profile-Service'
import './profile.css'

class MovieProfile extends React.Component {
    state = {
        genres: [],
        profile_name: '',
    }

    componentDidMount() {
        ProfileService.getCurrentUserProfile()
            .then(profile => {
                const genres = JSON.parse(profile[0].genre_like)
                const name = profile[0].full_name
                this.setState({
                    genres: genres,
                    profile_name: name
                })
            })
    }

    renderMovieGenres = () => {
        return this.state.genres.map(name => 
            <div>
                <p>{name.name}</p>
            </div>
            )
    }

    render() {
        return(
        <div className="profile">
            <MovieProfileNav path={this.props.location}/>
            <p className="profile-title">{this.state.profile_name}</p>

            <div className="info">
                <div>
                    <Link to='/movie-survey'>Edit</Link>
                </div>
                <div className="genre">
                    <p><b>Movie Genres:</b></p>
                    <p>{this.renderMovieGenres()}</p>
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