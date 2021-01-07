

const movieService = {
    getAllMovies() {
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2bb6427016a1701f4d730bde6d366c84&with_genres=28`)
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json())
    },

    getMyMovie()  {
        return fetch(`http://localhost:8000/myMovies`)
            .then(res => {
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            })
    },

    postMovie(id, title, overview, genre_id, release_date) {
        return fetch(`http://localhost:8000/myMovies`, {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                //authorization
            },
            body: JSON.stringify(id, title, overview, genre_id, release_date),
        })
            .then(res => {
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            })
    }
}

export default movieService;