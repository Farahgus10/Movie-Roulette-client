import React from 'react'
import MovieProfileNav from './movieProfileNav';

class YourMovies extends React.Component {
    render() {
        return( 
            <div>
                <MovieProfileNav path={this.props.path}/>
                <p>All the movies you have given a Thumbs Up to</p>
            </div>
        )
    }
    
}

export default YourMovies;