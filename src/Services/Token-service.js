import config from '../config'

const TokenService = {
    // combines name and password into 1 string with a colon in between. 
    makeBasicAuthToken(fullName, password) {
        // window.btoa creates a base64 encoded string
        return window.btoa(`${fullName}:${password}`)
    },
    saveAuthToken(token) {
        // accepts a token variable and stores it in local storage under the key configured in TOKEN_KEY
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
}

export default TokenService;