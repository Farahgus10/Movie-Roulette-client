import TokenService from './Token-service'
import config from '../config'

const ProfileService =  {
    getCurrentUserProfile() {
        return fetch(`${config.API_ENDPOINT}/profile/current-user`, {
            headers: {
                'authorization' : `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json());
    },
    insertUserProfile(profile_picture, genre_like, actor) {
        return fetch(`${config.API_ENDPOINT}/profile`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'authorization' : `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(profile_picture, genre_like, actor),
        })
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json());
    },
    updateUserProfile(id, profile_picture, genre_like, actor) {
        return fetch(`${config.API_ENDPOINT}/profile/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json',
                'authorization' : `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(profile_picture, genre_like, actor),
        })
        .then(res => 
            (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json());
    },
}

export default ProfileService