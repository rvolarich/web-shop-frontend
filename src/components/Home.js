import React from 'react';
import ReactDelayRender from 'react-delay-render';
import { connect } from 'react-redux';
import axios from 'axios';
import { URLL, GET_CART_PRODUCTS, UPDATE_COUNT } from '../actions/types';
import { loadLocalStorage } from '../Cart';

class Home extends React.Component{

constructor(props){
    super(props);
    this.updateCountNumber = this.updateCountNumber.bind(this)
}

componentDidMount(){
    setTimeout(() => {
    
        if(this.props.sessionExpired){
    
        window.location.replace(`${URLL}/sessionexp`)
      }
    }, 30)
      
    localStorage.setItem('lastUrl', `${URLL}/`);
        
    setTimeout(() => {
      
      if(this.props.isLogged){
        
           /*  axios.get('/getcart', {withCredentials:true})
             .then(response => response.data)
             .then(data => {
              for(let i = 0; i < data.length; i++){
                localStorage.setItem(data[i].productId, JSON.stringify(data[i]));
                localStorage.setItem(Date.now(), data[i].productId);
                for(let k = 0; k < 100; k++){}
            }
              
          }
             )*/

            /* this.props.dispatch({
              type: GET_CART_PRODUCTS,
              payload: loadLocalStorage()
             });
             this.updateCountNumber();*/

            /* axios.get('/get/user', { withCredentials:true})
          .then(response => {
            this.setState({userData:{...this.state.userData, email: response.data.username, nameName: this.props.username}})
            })*/
    
             }else{
            /*  this.props.dispatch({
                type: GET_CART_PRODUCTS,
                payload: loadLocalStorage()
                });
      
              this.updateCountNumber();*/
            }
            }, 30); 
}

updateCountNumber = () => {
    let totalCount = 0;
  
    for(let i = 0; i < this.props.cartProducts.length; i++){
      totalCount = totalCount + this.props.cartProducts[i].productQuantity;
   }
   
   this.props.dispatch({
    type: UPDATE_COUNT,
    payload: totalCount
  });
  }


render(){
    return(
        <div style={{margin:'auto', width:'67%', minHeight:'410px'}}>
        
        <div style={{margin:'auto', width:'67%', paddingTop:'100px', textAlign:'center'}}>
        <h3>Welcome to the fake web shop!</h3>
        <p>Created by Robert Volarić</p>
        </div>
        </div>
    )
}
    
}

const mapStateToProps = state => ({
    count: state.posts.count,
    isLogged: state.posts.isLogged,
    cartProducts: state.posts.cartProducts
    });

export default connect(mapStateToProps)(Home);