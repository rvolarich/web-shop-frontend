import { GET_DATA, POST_DATA, GET_CART_QTY, GET_CART_PRODUCTS, 
    SET_CART_QTY, DELETE_CART, UPDATE_CART, UPDATE_COUNT, DELETE_CART_ITEM }  from './types';
import axios from 'axios';

/*export const fetchPosts = () => dispatch => {
    console.log('fetching');
    fetch('http://localhost:8080/products')
    .then(res => res.json())
    .then(products => dispatch({
        type: GET_DATA,
        payload: products
    }));
}*/

export const fetchPosts = () => dispatch => {
    console.log('been in fetchPosts');
    axios.get('http://localhost:8080/products')
    .then(response => response.data)
    .then(products => dispatch({
        type: GET_DATA,
        payload: products
    }));
}

export const getCartQty = () => dispatch => {
    console.log('been in getCartQty');
    axios.get('http://localhost:8080/getcartqty')
    .then(response => response.data)
    .then(cartQty => dispatch({
        type: GET_CART_QTY,
        payload: cartQty
    }));
}

export const getCartProducts = () => dispatch => {
    console.log('been in getCartProducts');
    axios.get('http://localhost:8080/getcart')
    .then(response => response.data)
    .then(cartProducts => dispatch({
        type: GET_CART_PRODUCTS,
        payload: cartProducts
    }));
}

export const getCartItemQty = () => dispatch => {
    console.log('been in getCartItemQty');
    axios.get('http://localhost:8080/getcartitemqtys')
    .then(response => response.data)
    .then(cartQtyState => dispatch({
        type: SET_CART_QTY,
        payload: cartQtyState
    }));
}

export const deleteCart = () => dispatch => {
    console.log('been in deleteCart');
    axios.get('http://localhost:8080/deletecart')
    .then(response => response.data)
    .then(cartProducts => dispatch({
        type: DELETE_CART,
        payload: cartProducts
    }));
}

export const deleteCartItem = (product) => dispatch => {
    console.log('been in deleteCart: ' + product);
    axios.post('http://localhost:8080/deletecartbyid', product)
    .then(response => response.data)
    .then(cartProducts => dispatch({
        type: DELETE_CART_ITEM,
        payload: cartProducts
    }));
}

export const postCart = (products) => dispatch => {
    console.log("sent cart");
    axios.post('http://localhost:8080/postcartall', products)
    .then(response => response.data)
    .then(countQty => dispatch({
      type: UPDATE_CART,
      payload: countQty
    }))
    .catch(function (error) {
      console.log(error);
    });
}

/*export const confirmOrder = (products) =>  {
    console.log('been in confirmOrder: ' + products);
    axios.post('http://localhost:8080/confirmorder', products)
    .then(response => response.data)
    .catch(function (error) {
        console.log(error);
      });
}*/
/*export const deleteCartItem = (product) => dispatch => {
    console.log('fetching');
    fetch('http://localhost:8080/deletecartbyid', product)
    .then(res => res.json())
    .then(cartProducts => dispatch({
        type: DELETE_CART_ITEM,
        payload: cartProducts
    }));
}*/