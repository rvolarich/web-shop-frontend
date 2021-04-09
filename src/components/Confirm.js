import React from 'react';
import { Container } from 'react-bootstrap';
import ContinueShopping from './ContinueShopping';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCart } from '../actions/postActions'
import { GET_CART_PRODUCTS, UPDATE_COUNT } from '../actions/types';
import { eraseLocalStorageProductKeys, loadLocalStorage } from '../Cart';
import axios from 'axios';
class Confirm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      stateEmail:''
    }

    this.loadArray = this.loadArray.bind(this)
    this.sendArray = this.sendArray.bind(this)
  }

componentDidMount(){

 
  axios.get('/logged_in', 
        { withCredentials: true })
        .then(response => response.data)
        .then(data => {
          
         
          if(data.logged){
            //console.log('bio u logged_innnnnnnnnnnnn') 
            this.props.deleteCart();

            axios.get('/get/user', { withCredentials:true})
            .then(response => response.data)
            .then(data => {
            
              
              let userDataLocal = {
                nameName: data.nameName,
                email: data.username
                }
            
            
            let objectArray = [];
            objectArray = loadLocalStorage();
            objectArray.push(userDataLocal)
            
            setTimeout(() => {axios.post('/confirmorder', objectArray,
            { withCredentials: true })}, 200)
            
            
            })
          }else{

            let userData = {
            nameName: localStorage.getItem('confName'),
            email: localStorage.getItem('confEmail')
            }
            //console.log('bio u NOT logged innnnnnnnnnnnnn: ' + JSON.stringify(userData))
            
            let objectArray = [];
            objectArray = loadLocalStorage();
            objectArray.push(userData)
            
            setTimeout(() => {axios.post('/confirmorder', objectArray,
            { withCredentials: true })}, 200)
            }  
        })
        .catch(error => {
          console.log("check login error", error);
        });
  

        setTimeout(() => {this.props.dispatch({
          type: UPDATE_COUNT,
          payload: 0
          })
        }, 200) 

        setTimeout(() => {eraseLocalStorageProductKeys();}, 1000) 
              
        }

loadArray = () => {
  let objectArray = [];
  this.props.cartProducts.map(item => {
    objectArray.push(item)
  })
  return objectArray;
}

sendArray = (data) => {
  
    axios.post('/confirmorder', data,
    { withCredentials: true })
    
}


    render(){
        return(
            <div style={{margin:'auto', minHeight:'410px', paddingTop:'110px', textAlign:'center'}}>
         
         <h3>Congratulations on your purchase!</h3> <br />
         {this.props.isLogged ? 
         <p>An email has been sent to <span style={{color:'green'}}>{localStorage.getItem('email')}</span> with your order information! </p> :
         <p>An email has been sent to <span style={{color:'green'}}>{localStorage.getItem('confEmail')}</span> with your order information! </p>
        }      
           <ContinueShopping />
           </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return{
      dispatch,
       ...bindActionCreators({ deleteCart }, dispatch)
  }
  }
  
  const mapStateToProps = state => ({
      isLogged: state.posts.isLogged,
      cartProducts: state.posts.cartProducts,
      nameName: state.posts.nameName,
      email: state.posts.email
    });
  
  export default connect (mapStateToProps, mapDispatchToProps)(Confirm);