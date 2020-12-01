import { GET_DATA, POST_DATA, INCREMENT, GET_CART_QTY, GET_CART_PRODUCTS  }  from '../actions/types';

const initialState = {
    products: [],
    product: {},
    cartProducts: [],
    count: null
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
            return{
                ...state,
                count: action.payload
            }
            case GET_CART_PRODUCTS:
                console.log('been in actions qty');
                return{
                    ...state,
                    cartProducts: action.payload
                }
        case INCREMENT:
            
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state;
    }
}