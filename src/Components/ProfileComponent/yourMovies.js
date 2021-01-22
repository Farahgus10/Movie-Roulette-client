import React from 'react'
import MovieProfileNav from './movieProfileNav';
import MovieService from '../../Services/Movie-Service'

class YourMovies extends React.Component {
    state = {
        yourMovies: [],
    }

    componentDidMount() {
        MovieService.getMyMovies()
            .then(movie => {
                this.setState({
                    yourMovies: movie.filter(val => !val.disliked)
                })
            })
    }

    render() {
        const movieList = this.state.yourMovies.map((movie, i) => {
            return (
                <li key={i}>
                   <ul>
                       <p>{movie.title}</p>
                       <p>{movie.overview}</p>
                    </ul> 
                </li>
            )
        })

        return( 
            <div>
                <MovieProfileNav path={this.props.path}/>
                <p>All the movies you have given a Thumbs Up to</p>
                {movieList}
            </div>
        )
    }
    
}

export default YourMovies;