import React from 'react-router-dom'
import MovieProfileNav from './movieProfileNav';

function YourMovies() {
    return( 
        <div>
            <MovieProfileNav />
            <p>All the movies you have given a Thumbs Up to</p>
        </div>
    )
}

export default YourMovies;