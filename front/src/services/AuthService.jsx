import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const loginToApp = async (access) => {
    const response = await axios.post(API_URL + '/login', access)
    return response
};

export const createAccountApp = async (account) => {
    const response = await axios.post(API_URL + '/register', account)
    return response
};