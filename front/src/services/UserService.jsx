import axios from 'axios';

const API_URL = 'http://localhost:8080'

export const getUsers = async (user) => {
    const response = await axios.get(API_URL + '/user/' + user.id, user)
    return response
}

export const editUser = async (user) => {
    const response = await axios.post(API_URL + '/user/' + user.id, user)
    return response
}