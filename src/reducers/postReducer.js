import { GET_DATA, POST_DATA, INCREMENT, GET_CART_QTY, 
    GET_CART_PRODUCTS, SET_CART_QTY, 
    DELETE_CART, SET_CART_PRODUCT_QUANTITY, UPDATE_CART, UPDATE_COUNT,
    DELETE_CART_ITEM, 
    UPDATE_CART_TOTAL, IS_LOGGED, SET_CART_PRODUCT_QUANTITY_LOCAL, KEY_SEQUENCE, 
    GET_LOCAL_CART_PRODUCTS, SHOW_MODAL}  from '../actions/types';
import update from 'immutability-helper';
import { actions } from 'react-table';

const initialState = {
    products: [],
    product: {},
    cartProducts: [],
    localCartProducts: [],
    count: null,
    cartQtyState: [],
    updateCart: {},
    cTotal: 0,
    shipping: 52.24,
    isLogged: false,
    showModal: false,
    username: '',
    loginStatus: '',
    cartProductQuantity: {
        prodId: 1,
        cartProductQuantityNumber: 5
    },
    keySequence: []
    
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

        case GET_LOCAL_CART_PRODUCTS:
                    console.log('been in localCartProducts');
                    return{
                        ...state,
                        localCartProducts: action.payload
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
             
            }

            case SET_CART_PRODUCT_QUANTITY_LOCAL:
            var x = 0;
             console.log('been in set product quantity local: ' + action.payload);
               
             return {
             ...state,
             cartProductQuantity: action.payload

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
               // count: state.updateCart.totalCartQty
               count: action.payload
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
                            isLogged: action.payload.logged,
                            username: action.payload.username,
                            loginStatus: action.payload.loginStatus
                        }
                        
                        
         case KEY_SEQUENCE:
            
                 return {
                ...state,
                keySequence: action.payload
                }
            
        case SHOW_MODAL:
            
                    return {
                   ...state,
                   showModal: action.payload
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