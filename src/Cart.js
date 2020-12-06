import React, {Children, Component} from 'react';
import axios from 'axios';
import './App.css'
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import './Cart.css';
import CartItem from './CartItem'
import CartCalculator from './components/CartCalculator'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCartProducts, getCartQty, deleteCart, postCart,
          deleteCartItem, fetchPosts } from './actions/postActions';
import { GET_CART_QTY, UPDATE_CART_TOTAL} from './actions/types';
import { bindActionCreators } from 'redux';
//import { getCartProducts } from './Repository2';


let total = 0;
let allowCountUpdate = new Boolean();

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
        this.addTotal = this.addTotal.bind(this)
        this.confirmOrder = this.confirmOrder.bind(this)
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
      this.props.fetchPosts();
    }

    deleteCart = () => {
        this.props.deleteCart();
        allowCountUpdate = false;
 }

 

 componentDidUpdate(){
  total = 0;
  
  let totalRounded = 0;
  console.log("been in componentDidUpdate: ");
  console.log("product length: " + this.props.cartProducts.length);
  if(this.props.cartProducts != null){
    for(let i = 0; i < this.props.cartProducts.length; i++){
        total += this.props.cartProducts[i].productPrice * this.props.cartProducts[i].productQuantity;
        console.log("product price: " + this.props.cartProducts[i].productQuantity);
    
    
        
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
  this.props.postCart(this.props.cartProducts);
  allowCountUpdate = true;
  
  window.location.reload();
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
    console.log("been in add total");
    return (Math.round((Number(total) + Number(shipping)) * 100) / 100).toFixed(2);
    }

    confirmOrder = () => {
      axios.post('http://localhost:8080/confirmorder', this.props.cartProducts)
    .then(response => response.data)
    .catch(function (error) {
        console.log(error);
      });
      window.location.reload();
      
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
    
    
    const { cartProducts, total, count, cTotal, shipping} = this.props;
     
  return (
    <Container>
        
    <Row >
              <Button variant="outline-info" onClick={this.deleteCart} 
              style={{marginTop:'40px', marginBottom:'20px'}}>Clear cart</Button>
    </Row>
    
    <Row>
        <Col>
          <hr />      
            {count !== null ?  <div>
        {
          cartProducts.map((product, index) => 
          <CartItem product={product} key={index} 
          deleteCartProduct={(num) => this.deleteCartItemById(num)} updateCartItems={() => {this.updateCart()}}
          />
          )
          
        }
                </div> : null}
        </Col>

    
     
     <Col xs={3.5} >
     {count !== null ? <div>
        <CartCalculator cTotal={cTotal} shipping={shipping} prodStock={cartProducts.productStock} 
        totalAmount={this.addTotal(cTotal, shipping)} confirmOrder={this.confirmOrder} />
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
    deleteCartItem, fetchPosts }, dispatch)
}
}

const mapStateToProps = state => ({
    cartProducts: state.posts.cartProducts,
    products: state.posts.products,
    count: state.posts.count,
    updateCart: state.posts.updateCart,
    cTotal: state.posts.cTotal,
    shipping: state.posts.shipping,
    
  });

export default connect (mapStateToProps, mapDispatchToProps)(Cart);

