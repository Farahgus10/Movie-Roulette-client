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
                <div className="watched_movies">
                    <li key={movie.id}>
                        <ul>
                            <p>{movie.title}</p>
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
        <div className="watch_again">
            <MovieProfileNav path={this.props.location} watchedNum={this.state.myWatchedMovies.length}/>
            {this.renderWatchedMovies()}
        </div>
    )
}
}

export default WatchAgain;