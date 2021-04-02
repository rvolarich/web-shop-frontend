import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED, GET_CART_PRODUCTS, UPDATE_COUNT, GET_DATA } from '../actions/types';
import { loadLocalStorage } from '../Cart';

class SetLoggedIn extends React.Component{

    constructor (props) {
        super(props);
        this.updateCountNumber = this.updateCountNumber.bind(this)
        }

    componentDidMount(){
     
      setTimeout(() => {
        this.props.dispatch({
          type: GET_CART_PRODUCTS,
          payload: loadLocalStorage()
         });
         this.updateCountNumber();
      }, 30)
      

        axios.get(`/logged_in?sessionExpired=${this.props.sessionExpired}`, 
        { withCredentials: true })
        .then(response => {
          console.log("logged_in = " + response.data) 
          this.props.dispatch({
            type: IS_LOGGED,
            payload: response.data
        });
        })
        .catch(error => {
          console.log("check login error", error);
        });

        /*axios.get("/products", {withCredentials: true})
        .then(response => response.data)
        .then(data => {
            this.props.dispatch({
            type: GET_DATA,
            payload: data
        })
        })
        .catch(error => {
          console.log("check session error", error);
        });*/

        
        
      }

      updateCountNumber = () => {
        let totalCount = 0;
    
        console.log('updateCount length' + this.props.cartProducts.length)
       for(let i = 0; i < this.props.cartProducts.length; i++){
          totalCount = totalCount + this.props.cartProducts[i].productQuantity;
       }
    
       console.log('updateCount total ' + totalCount)
       this.props.dispatch({
        type: UPDATE_COUNT,
        payload: totalCount
      });
      }

    render(){

      const { sessionExpired } = this.props;
        return(
            <div>
              
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged,
    username: state.posts.username,
    sessionExpired: state.posts.sessionExpired,
    cartProducts: state.posts.cartProducts
    });

export default connect(mapStateToProps)(SetLoggedIn);