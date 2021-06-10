import React from 'react'
import MovieProfileNav from './movieProfileNav';
import MovieService from '../../Services/Movie-Service'

class WatchAgain extends React.Component {
    state = {
        myWatchedMovies: []
    }

componentDidMount() {
    MovieService.getMyMovies()
        .then(movie => {
            this.setState({
                myWatchedMovies: movie.filter(val => (val.watched) && (!val.disliked))
            })
        })
}

renderWatchedMovies() {
    if(this.state.myWatchedMovies.length != 0) {
        return this.state.myWatchedMovies.map(movie => {
            return (
                <div className="watched_movies_list">
                    <li key={movie.id}>
                        <ul>
                            <img src={'https://image.tmdb.org/t/p/w300/'+movie.poster} alt="image" />
                            <p><b>{movie.title}</b></p>
                            <p>{movie.overview}</p>
                        </ul>
                    </li>
                </div>
            )
        })
    }
}

render() {
    return (
        <div className="watched_movies">
            <div className="movie_nav">
                <MovieProfileNav path={this.props.location} watchedNum={this.state.myWatchedMovies.length}/>
            </div>
            <div className="watch_again_group">
                {this.renderWatchedMovies()}
            </div>
            
        </div>
    )
}
}

export default WatchAgain;