import React, {Children, Component} from 'react';
import axios from 'axios';
import './App.css'
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import './Cart.css';
import CartItem from './CartItem'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCartProducts, getCartQty, deleteCart, postCart,
          deleteCartItem } from './actions/postActions';
import { GET_CART_QTY, UPDATE_CART, UPDATE_COUNT } from './actions/types';
import { bindActionCreators } from 'redux';
//import { getCartProducts } from './Repository2';



var allowCountUpdate = new Boolean();
class Cart extends React.Component {
    constructor(props){
        super(props);
        /*this.state = {
            products: [],
            total: 0
        }*/
        this.deleteCart = this.deleteCart.bind(this)
        this.updateCart = this.updateCart.bind(this)
        this.updateCount = this.updateCount.bind(this)
    }

    /*componentDidMount(){
       getCartProducts().then((products) => {
           let total = 0;
           if(products != null){
            for(var i = 0; i < products.length; i++){
                total += products[i].productPrice * products[i].productQuantity;
                
            }
            this.setState({ products, total});
                
           }
           else{
            total = 0;
            this.setState({total});
        }
       });
    }*/

    componentDidMount(){
      console.log("been in Cart");
        this.props.getCartProducts();
        this.props.getCartQty();
        allowCountUpdate = false;
    }

    deleteCart = () => {
        this.props.deleteCart();
        allowCountUpdate = false;
 }

 

 componentDidUpdate(){
  
  console.log("been in componentDidUpdate");
  if(allowCountUpdate){
  this.props.dispatch({
    type: GET_CART_QTY,
    payload: this.props.updateCart.totalCartQty
 })
}
}
 updateCart = () => {
  this.props.postCart(this.props.products);
  allowCountUpdate = true;
  /*this.props.dispatch({
    type: GET_CART_QTY,
    payload: this.props.updateCart.totalCartQty
  })*/
 }

 updateCount = () => {
  
 }
 /*postCart = () => dispatch => {
    console.log("sent cart");
    axios.post('http://localhost:8080/postcartall', this.props.products)
    .then(response => response.data)
    .then(countQty => dispatch({
      type: UPDATE_CART,
      payload: countQty
    })) 
    .catch(function (error) {
      console.log(error);
    });
    
    
}*/

/*postCart = () => {
  console.log("sent cart");
  axios.post('http://localhost:8080/postcartall', this.props.products)
  .then(function (response) {
    
    })
  .catch(function (error) {
    console.log(error);
  });
  this.props.getCartQty();
  this.props.dispatch({
    type: GET_CART_QTY,
    payload: this.props.count
  });
}*/
    
    render(){
    
    
    const { products, total, count} = this.props;
     
  return (
    <Container>
        
    <Row ><Button variant="outline-info" onClick={this.updateCart} 
              style={{marginTop:'40px', marginBottom:'20px'}}>Update cart</Button>
              <Button variant="outline-info" onClick={this.deleteCart} 
              style={{marginTop:'40px', marginBottom:'20px'}}>Clear cart</Button>
              
              </Row>
          <hr />      
      
    <div>
        
        {
products.map((product, index) =>
        <CartItem product={product} key={index}/>
            
        )
        
        }
    
    <h2>{total}</h2>
       
    
    </div>
    <div>
                  {count === null ? <h2>You have no items</h2> : null}
              </div>
        
    </Container>
        

        
    
    
  );
  }
}

/*const mapDispatchToProps = dispatch => ({
  getCartProducts,
  getCartQty,
  deleteCart,
  dispatch
});*/

function mapDispatchToProps(dispatch) {
  return{
    dispatch,
     ...bindActionCreators({ getCartProducts, getCartQty, deleteCart, postCart,
    deleteCartItem }, dispatch)
}
}

const mapStateToProps = state => ({
    products: state.posts.cartProducts,
    count: state.posts.count,
    updateCart: state.posts.updateCart
  });

export default connect (mapStateToProps, mapDispatchToProps)(Cart);