import { GET_DATA, POST_DATA, INCREMENT, GET_CART_QTY, GET_CART_PRODUCTS, SET_CART_QTY, DELETE_CART, SET_CART_PRODUCT_QUANTITY  }  from '../actions/types';
import update from 'immutability-helper';
import { actions } from 'react-table';

const initialState = {
    products: [],
    product: {},
    cartProducts: [],
    count: null,
    cartQtyState: []
}

export default function(state = initialState, action){
    
    switch(action.type){
        case GET_DATA:
            
            return {
                ...state,
                products: action.payload
            }
        case GET_CART_QTY:
            console.log('been in actions qty');
            if(action.payload === 0){
                return{
                    ...state,
                    count: null
                }
            }else{
            return{
                ...state,
                count: action.payload
            }}
        case GET_CART_PRODUCTS:
                console.log('been in actions qty');
                return{
                    ...state,
                    cartProducts: action.payload
                }
        case SET_CART_QTY:
                console.log('been in actions qty');
                return{
                    ...state,
                    cartQtyState: action.payload
                    }
        case DELETE_CART:
                console.log('been in actions qty');
                return{
                    ...state,
                    cartProducts: action.payload,
                    count: null
                }
        case SET_CART_PRODUCT_QUANTITY:
            
            console.log('been in seeeeeeet: ' + action.payload);
            const newProducts = {...state};
            newProducts.cartProducts[3] = action.payload;
            return (
                newProducts
                )
                
        
        case INCREMENT:
            
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state;
    }
}