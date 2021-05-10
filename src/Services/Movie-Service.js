import TokenService from './Token-service'

const movieService = {
    getAllMovies(page) {
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2bb6427016a1701f4d730bde6d366c84&page=${page}`)
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json())
    },
    getMovieGenres() {
        return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2bb6427016a1701f4d730bde6d366c84&language=en-US`)
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json())
    },

    getMyMovies()  {
        return fetch(`http://localhost:8000/myMovies`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,   
            },
        })
            .then(res => 
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json())
    },

    postMovie(id, title, overview, genre_id, release_date, disliked, user_id) {
        return fetch(`http://localhost:8000/myMovies`, {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,   
            },
            body: JSON.stringify(id, title, overview, genre_id, release_date, disliked, user_id),
        })
            .then(res => {
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            })
    },
    
    updateMovieList(id, user_id, watched) {
        return fetch(`http://localhost:8000/myMovies/${id}/${user_id}`, {
            method: 'PATCH',
            headers: {
                'content-type':'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,   
            },
            body: JSON.stringify(watched),
        })
        .then(res => {
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        })
    }
}

export default movieService;