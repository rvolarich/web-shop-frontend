import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProductId } from './Repository2';
import { connect } from 'react-redux';
import Shop from './Shop';
import count from './Shop'
import AddToCartButton from './AddToCartButton';
import ShopItemSelected from './ShopItemSelected';
import Navig from './Navig';
import { cartChildren } from './App'
import { getCartQty } from './actions/postActions';
import { GET_DATA, POST_DATA, GET_CART_QTY, INCREMENT, 
  SET_CART_PRODUCT_QUANTITY_LOCAL, KEY_SEQUENCE, GET_CART_PRODUCTS  }  from './actions/types';
import { loadLocalStorage } from './Cart';
import { bindActionCreators } from 'redux';

let compare = 0;
let keySequence = [];
class ShopItem extends React.Component{
   
  
  
    constructor(props){
        super(props);
        this.state = {
          cartData: {
            productId: this.props.product.productId,
            productName: this.props.product.productName,
            productQuantity: 0,
            productStock: this.props.product.productQuantity,
            productPrice: this.props.product.productPrice,
            productDescription: this.props.product.productDescription,
            productImage: this.props.product.productImage
          }
          
        }

        this.clickMe = this.clickMe.bind(this)
        
    }

    /*incrementCart(){
      this.cartQty += 1;
    }*/
    componentDidMount(){
     /* this.props.dispatch({
        type: GET_CART_PRODUCTS,
        payload: loadLocalStorage()
      });*/
    }

   clickMe = () => {

    if(this.props.isLogged){

     /* fetch('http://127.0.0.1:8080/pcp', {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.props.product)
        
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });*/
     axios.post('http://127.0.0.1:8080/pcp', 
      this.props.product, { withCredentials: true }).then(function (response) {
        console.log(response);
        
        })
      .catch(function (error) {
        console.log(error);
      });

      this.props.dispatch({
        type: INCREMENT
      });
      /*axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/pcp',
        data: this.props.product,
        withCredentials: 'true',
        headers:{
          'Content-Type': 'application/json'
        }
      });*/
    }else{
    
    let productQuantityLocal = 0;
    let updateCartQuantityArray = [];
    let cartProductQuantity = [];
    cartProductQuantity = this.props.cartProducts;
    console.log("cartProducts " + JSON.stringify(cartProductQuantity.length));
    console.log("cartProductsProductId " + JSON.stringify(this.props.product.productId));
    for(let i = 0; i < cartProductQuantity.length; i++){
      if(cartProductQuantity[i].productId === this.props.product.productId){
        
        productQuantityLocal = cartProductQuantity[i].productQuantity;
        console.log("productQuantityLocal " + productQuantityLocal);
      }
    }

    //let increment = localStorage.setItem('count', parseInt(localStorage.getItem('count'))+1);

   
    this.props.dispatch({
          type: INCREMENT
        });


        
        
       /* keySequence.push(this.props.product.productId);
        localStorage.setItem(Date.now(), keySequence);
        this.props.dispatch({
          type: KEY_SEQUENCE,
          payload: keySequence
        });*/
        

        setTimeout(() => {
          keySequence.push(this.props.product.productId);
        localStorage.setItem(Date.now(), this.props.product.productId);
        this.props.dispatch({
          type: KEY_SEQUENCE,
          payload: keySequence
        });
          let newArray = {...this.state.cartData};
        console.log("This state prodqty: " + this.props.cartProducts.productQuantity);
        newArray= {...newArray, productQuantity: productQuantityLocal + 1}
        this.setState({cartData: newArray})
        this.setCartQtyState();
      
      
      }, 20);
    }
      }

      setCartQtyState = () => {
        let id = this.props.product.productId;
        localStorage.setItem(id, JSON.stringify(this.state.cartData));
        console.log("idddddddddddddddddddddddddddddddddddddddd " + id)
        setTimeout(function() { //Start the timer
          
          this.props.dispatch({
            type: GET_CART_PRODUCTS,
            payload: loadLocalStorage()
          });
          
      }.bind(this), 20)
    }
    
    
    render(){
        const {product} = this.props;
        
        return(
<Container>
      
        <Row key={product.productId} style={{minHeight:'200px', marginTop:'20px'}}>
          <Col  xs={4}>
          <img className="rounded mb-0" alt="100x100" 
          src={product.productImage} alt=""></img>
          </Col>
          <Col  xs={5} style={{marginTop:'80px'}}>
            <div>
        <h3 >{product.productName}</h3>
           </div>
           <br />
           <div>
           <h4>{product.productDescription}</h4>
           </div>
           <br />
            <div >
              {product.productQuantity <= 0 ? <h6><span style={{color: 'red'}}>Out of stock</span></h6> :
               <h6><span style={{color: 'green'}}>In Stock:</span> {product.productQuantity}</h6>} 
            </div>
          </Col>
          <Col  xs={3}>
            <div style={{marginTop:'30px', marginLeft: '60px'}}>
              <h5>Price: {parseFloat(product.productPrice).toFixed(2)}, EUR</h5>
            </div>
            <br />
           
            
          {product.productQuantity <= 0 ? 
          <p style={{marginTop: '115px', marginLeft: '40px'}}>Available in two weeks</p> : <AddToCartButton 
          postToCart={this.clickMe}/>}
          </Col>
          
        </Row>
        <hr />
        
        
        
      </Container>
      
        );
    }

}

function mapDispatchToProps(dispatch) {
  return{
    dispatch,
     ...bindActionCreators({ getCartQty }, dispatch)
}
}

const mapStateToProps = state => ({
  cartProducts: state.posts.cartProducts,
  isLogged: state.posts.isLogged,
  username: state.posts.username
});

export default connect(mapStateToProps,mapDispatchToProps)(ShopItem);