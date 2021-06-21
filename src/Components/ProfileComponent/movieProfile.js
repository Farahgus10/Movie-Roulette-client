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

    async componentDidMount() {
        ProfileService.getCurrentUserProfile()
            .then(profile => {
                if(profile[0].genre_like !== 'none') {
                    this.setState({
                        genres: JSON.parse(profile[0].genre_like)
                    })
                }
                const name = profile[0].full_name
                this.setState({
                    profile_name: name
                })
            })
    }

    renderMovieGenres = () => {
        return (this.state.genres.length === 0) ? "You haven't selected any genres that you like. " : this.state.genres.map(name => 
            <div className="genre_name">
                <p>{name.name}</p>
            </div>
            )
   
    }

    render() {
        return(
            <div className="profile">
                <div className="movie_nav">
                    <MovieProfileNav path={this.props.location}/> 
                </div>

                <div className="user_info">
                    <p className="profile-title">{this.state.profile_name}</p>
                </div>

                <div className="info">
                    <p><b>Movie Genres:</b></p>
                    <div className='edit_link'>
                        <Link to='/movie-survey'>Edit your genre selection</Link>
                    </div>
                    <div className="genre">    
                        {this.renderMovieGenres()}
                    </div>

                      {/* <div className="movies_watched">
                        <p><b>Movies Watched:</b></p>
                    </div> */}
                </div>
            </div>
        )
    }
    
}

export default MovieProfile;