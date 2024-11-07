import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const login = async (access) => {
    const response = await axios.post(API_URL + '/login', access)
    return response
}

export const createAccount = async (account) => {
    const response = await axios.post(API_URL + '/register', account)
    return response
}

export const sendResetPasswordEmail = async (email) => {
    const response = await axios.post(API_URL + '/reset-password-email', email, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    return response
}

export const resetPassword = async (request) => {
    const response = await axios.post(API_URL + '/reset-password', request)
    return response
}