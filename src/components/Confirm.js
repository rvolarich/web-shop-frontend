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
      userData: {
        nameName:'',
        email: ''
      }
    }

    this.loadArray = this.loadArray.bind(this)
  }

componentDidMount(){

 

  this.props.dispatch({
    type: GET_CART_PRODUCTS,
    payload: loadLocalStorage()
  })

  setTimeout(() => {
    
    if(this.props.isLogged){

      this.props.deleteCart();

    axios.get('/get/user', { withCredentials:true})
  .then(response => response.data)
  .then(data => {
    
    this.setState({userData:{...this.state.userData, email: data.username, nameName: data.nameName}})
    
    let objectArray = [];
    objectArray = this.loadArray();
    objectArray.push(this.state.userData)

    axios.post('/confirmorder', objectArray,
    { withCredentials: true })


})}

else{
  
  let userData = {
    nameName: localStorage.getItem('confName'),
    email: localStorage.getItem('confEmail')
  }

  console.log(JSON.stringify(userData))
  let objectArray = [];
  objectArray = this.loadArray();
  objectArray.push(userData)

  axios.post('/confirmorder', objectArray,
    { withCredentials: true })

}

this.props.dispatch({
  type: UPDATE_COUNT,
  payload: 0
})

}, 50)

setTimeout(() => {eraseLocalStorageProductKeys();}, 500) 
       
}

loadArray = () => {
  let objectArray = [];
  this.props.cartProducts.map(item => {
    objectArray.push(item)
  })
  return objectArray;
}


    render(){
        return(
            <div style={{margin:'auto', minHeight:'410px', paddingTop:'110px', textAlign:'center'}}>
         
         <h3>Congratulations on your purchase!</h3> 
                
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