import config from '../config'

const movieService = {
    getMovies() {
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2bb6427016a1701f4d730bde6d366c84&with_genres=28,18`,)
            .then(resonse => response.json()
            .then(responseJson => console.log(responseJson)))
    }
}

export default movieService;