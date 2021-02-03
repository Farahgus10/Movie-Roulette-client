import TokenService from './Token-service'

const ProfileService =  {
    getCurrentUserProfile() {
        return fetch(`http://localhost:8000/profile/current-user`, {
            headers: {
                'authorization' : `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json());
    },
    insertUserProfile() {
        return fetch(`http://localhost:8000/profile/`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'authorization' : `bearer ${TokenService.getAuthToken}`
            },
            body: JSON.stringify(profile_picture, genre_like, actor),
        })
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json());
    }
}

export default ProfileService