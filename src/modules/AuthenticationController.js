import axios from 'axios';

const baseAPIauth = process.env.VUE_APP_BASE_URL_API_AUTH

export const AuthenticationController = {
    authenticate(credentials) {
        return axios({
            method: 'POST',
            baseURL: baseAPIauth,
            url: 'users/auth/',
            data: credentials,
        })
    }
}
