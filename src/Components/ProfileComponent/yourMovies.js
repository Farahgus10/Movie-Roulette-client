import React from 'react'
import MovieProfileNav from './movieProfileNav';
import MovieService from '../../Services/Movie-Service'
import ProfileService from '../../Services/Profile-Service'

class YourMovies extends React.Component {
    state = {
        yourMovies: [],
        currentProfileInfo: [],
    }

    componentDidMount() {
        ProfileService.getCurrentUserProfile()
            .then(profile => {
                if(profile.length == 0) {
                    const newUserProfileInfo = {
                        'profile_picture': 'profile pic here',
                        'genre_like': 'none',
                        'actor': 'none'
                    }
                    ProfileService.insertUserProfile(newUserProfileInfo)
                }

                this.setState({
                    currentProfileInfo: profile
                })
            })

        MovieService.getMyMovies()
            .then(movie => {
                this.setState({
                    yourMovies: movie.filter(val => !val.disliked)
                })
            })
    }

    renderProfileInfo() {
        if(this.state.yourMovies.length !== 0) {
            return (
                this.state.yourMovies.map((movie, i) => {
                    return ( 
                        <div className="movie_list">
                            {console.log(movie)}
                        <li key={movie.id}>
                           <ul>
                               <p>{movie.title}</p>
                               <p>{movie.overview}</p>
                               <button onClick={() => this.handleWatched(movie.id, movie.user_id)}>I've watched this</button>
                            </ul> 
                        </li>
                        </div>
                    )
                })
            )
        } else {
            return (
                <h3>No movies here :(</h3>
            )
        }
    }

    handleWatched(id, user_id) {
        MovieService.updateMovieList(id, user_id, {
            watched: true,
        })
        
    }
 
    render() {
        const path = this.props.location

        return( 
            <div className="your_movies">
                <div className="movie_nav">
                    <MovieProfileNav path={path} />
                </div>
                
                {this.renderProfileInfo()} 
                
            </div>
        )
    }
    
}

export default YourMovies;