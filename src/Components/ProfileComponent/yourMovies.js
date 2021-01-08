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
                console.log(movie)
                this.setState({
                    yourMovies: movie
                })
            })
    }

    render() {
        console.log(this.state.yourMovies)

        return( 
            <div>
                <MovieProfileNav path={this.props.path}/>
                <p>All the movies you have given a Thumbs Up to</p>
            </div>
        )
    }
    
}

export default YourMovies;