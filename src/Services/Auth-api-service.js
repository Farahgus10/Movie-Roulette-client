
const AuthApiService = {
    postLogin(credentials) {
        return fetch(`http://localhost:8000/auth/login`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                    )
    },
}

export default AuthApiService