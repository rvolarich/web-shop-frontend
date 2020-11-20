import axios from 'axios';

const BASE_URL = 'http://localhost:8080'

export function getCartItems(){
    return axios.get('http://localhost:8080/items').then(response => response.data);
}

export function getProducts(){
    return axios.get('http://localhost:8080/products').then(response => response.data);
}

export function getPhoto(){
    return axios.get('http://localhost:8080/photo').then(response => response.data);
}

