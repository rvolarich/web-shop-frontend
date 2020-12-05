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
import { GET_CART_QTY, UPDATE_CART_TOTAL} from './actions/types';
import { bindActionCreators } from 'redux';
//import { getCartProducts } from './Repository2';


let total = 0;
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
      allowCountUpdate = false;
      this.props.getCartProducts();
      this.props.getCartQty();
    }

    deleteCart = () => {
        this.props.deleteCart();
        allowCountUpdate = false;
 }

 

 componentDidUpdate(){
  total = 0;
  let totalRounded = 0;
  console.log("been in componentDidUpdate: ");
  console.log("product length: " + this.props.products.length);
  if(this.props.products != null){
    for(let i = 0; i < this.props.products.length; i++){
        total += this.props.products[i].productPrice * this.props.products[i].productQuantity;
        console.log("product price: " + this.props.products[i].productQuantity);
    
    
        
   }
  }
   else{
    total = 0;
   }  
   totalRounded = (Math.round(total * 100) / 100).toFixed(2);
   this.props.dispatch({ 
    type: UPDATE_CART_TOTAL,
    payload: Number(totalRounded)
  });
  
  if(allowCountUpdate){
    console.log("dispatched total cart qty");
  this.props.dispatch({
    type: GET_CART_QTY,
    payload: this.props.updateCart.totalCartQty
 })
 allowCountUpdate = false;
}

}
 updateCart = () => {
  this.props.postCart(this.props.products);
  allowCountUpdate = true;
 }

 updateCount = () => {
  
 }

 deleteCartItemById(id) {
  
  const prodObj = {
    productId: id
  }
  console.log("bio u delete cart iteeeeeeeeeeeeeeeem: " + JSON.stringify(prodObj));
  this.props.deleteCartItem(prodObj); 
  
  allowCountUpdate = false;
  window.location.reload();
  }

  addTotal = (total, shipping) => {
    return (Math.round((Number(total) + Number(shipping)) * 100) / 100).toFixed(2);
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
              <Row>
               <Col>
          <hr />      
      
          {count !== null  ?  <div>
        
        {
products.map((product, index) =>
        <CartItem product={product} key={index} deleteCartProduct={(num) => this.deleteCartItemById(num)} />
            
        )
        
        }
    
     </div> : null}
     </Col>

    
     
     <Col xs={4} >
     {count !== null ? <div className="block-example border border-light">
     <Row>
     <div>
       <h4>Cart overview</h4>
     </div>
     </Row>
     <Row>
     <div>
       <h5>Cart total: {this.props.cTotal}</h5>
     </div>
     </Row>
     <Row>
     <div>
       <h5>Shipping: {this.props.shipping}</h5>
     </div>
     </Row>
     <Row>
     <div>
       <h5>Total with shipping: {this.addTotal(this.props.cTotal, this.props.shipping)}</h5>
     </div>
     </Row>
     <Row>
     <div>
     <Button variant="outline-secondary"  
              style={{marginTop:'40px', marginBottom:'20px'}}>Continue shopping</Button>
              <Button variant="outline-info" 
              style={{marginTop:'40px', marginBottom:'20px'}}>Confirm order</Button>
     </div>
     
     </Row>
     </div> : null}
     </Col>
     

     </Row>
    <div>
                  {count === null || count === 0 ? <h2>You have no items</h2> : null}
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
    updateCart: state.posts.updateCart,
    cTotal: state.posts.cTotal,
    shipping: state.posts.shipping,
    
  });

export default connect (mapStateToProps, mapDispatchToProps)(Cart);