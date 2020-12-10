import { GET_DATA, POST_DATA, INCREMENT, GET_CART_QTY, 
    GET_CART_PRODUCTS, SET_CART_QTY, 
    DELETE_CART, SET_CART_PRODUCT_QUANTITY, UPDATE_CART, UPDATE_COUNT,
    DELETE_CART_ITEM, 
    UPDATE_CART_TOTAL, IS_LOGGED}  from '../actions/types';
import update from 'immutability-helper';
import { actions } from 'react-table';

const initialState = {
    products: [],
    product: {},
    cartProducts: [],
    count: null,
    cartQtyState: [],
    updateCart: {},
    cTotal: 0,
    shipping: 52.24,
    isLogged: false
    
}

export default function(state = initialState, action){
    
    switch(action.type){
        case GET_DATA:
            
            return {
                ...state,
                products: action.payload
            }
        case GET_CART_QTY:
            console.log('been in setting cart qty');
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
                console.log('been in set cart qty');
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
        case DELETE_CART_ITEM:
                    console.log('been in delete cart item: ' + action.payload);
                    return{
                        ...state,
                        cartProducts: action.payload,
                        
                    }
        case SET_CART_PRODUCT_QUANTITY:
            var x = 0;
             console.log('been in seeeeeeet: ' + action.payload);
               // const newState = {...state};
             return {
             ...state,
             cartProducts: state.cartProducts.map((item) => {

                if(item.productId === action.payload.prodId){
                    return {
                        ...item,
                        productQuantity: parseInt(action.payload.fieldValue)
                        
                }
            }
                return item;
                
             })
             /*count: state.cartProducts.map((item) => {
                  x += item.productQuantity
                
             })*/
             
            }
        case UPDATE_CART:
            return{
                ...state,
                updateCart: action.payload,
                
            } 

        case UPDATE_COUNT:
            console.log('bio u countu');
            return{
                ...state,
                count: state.updateCart.totalCartQty
            }
        case UPDATE_CART_TOTAL:
            console.log('bio u update_cart_total');
                return{
                    ...state,
                    cTotal: action.payload
                }
        
        case IS_LOGGED:
            console.log('bio u IS_LOGGED');
                        return{
                            ...state,
                            isLogged: action.payload
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