import axios from 'axios';

const baseAPIuser = process.env.VUE_APP_BASE_URL_API_USER

export const UserController = {
    create(user) {
        return axios({
            method: 'POST',
            baseURL: baseAPIuser,
            url: 'users',
            data: user,
        })
    },
    list() {
        return axios({
            method: 'GET',
            baseURL: baseAPIuser,
            url: 'users'
        });
    },
    delete(id) {
        return axios({
            method: 'DELETE',
            baseURL: baseAPIuser,
            url: `users/${id}`,
        });
    },
    getUser(id) {
        return axios({
            method: 'GET',
            baseURL: baseAPIuser,
            url: `users/${id}`,
        });
    },
    updateUser(id, user) {
        return axios({
            method: 'PUT',
            baseURL: baseAPIuser,
            url: `users/${id}`,
            data: user,
        });
    }
}
