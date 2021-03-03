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
import { GET_CART_PRODUCTS, GET_CART_QTY, UPDATE_CART_TOTAL, SET_CART_PRODUCT_QUANTITY, UPDATE_COUNT} from './actions/types';
import { bindActionCreators } from 'redux';
import { allowConfirmButton } from './components/CartCalculator';
//import { getCartProducts } from './Repository2';


let total = 0;
let allowUpdateCartLocal = false;
let allowCountUpdate = true;
/*const TodoItems = ({ entries }) => (
  <ul>
    {entries.map(({ heading, key }) => (
      <li key={key}>{heading}</li>
    ))}
  </ul>
);*/
class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
        this.deleteCart = this.deleteCart.bind(this)
        this.updateCart = this.updateCart.bind(this)
        //this.updateCount = this.updateCount.bind(this)
        this.addTotal = this.addTotal.bind(this)
        this.confirmOrder = this.confirmOrder.bind(this)
       // this.loadLocalStorage = this.loadLocalStorage.bind(this)
        this.addTodo = this.addTodo.bind(this)
       
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

    componentDidUpdate(){
     // loadLocalStorage();
    }

    componentDidMount(){
     this.props.getCartQty();
     
     this.props.dispatch({
      type: GET_CART_PRODUCTS,
      payload: loadLocalStorage()
    });
        allowCountUpdate = false;
      this.props.fetchPosts();
      total = 0;
      let totalCount = 0;
  
      let totalRounded = 0;
      /*console.log("been in componentDidUpdate: ");
      console.log("product length: " + this.props.cartProducts.length);*/
      setTimeout(() => { 
        
        if(this.props.cartProducts != null){
        
        for(let i = 0; i < this.props.cartProducts.length; i++){
            total += this.props.cartProducts[i].productPrice * this.props.cartProducts[i].productQuantity;
           /* console.log("product price: " + this.props.cartProducts[i].productPrice);
            console.log("product qty: " + this.props.cartProducts[i].productQuantity);
            console.log("bio u total zerooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ");
            console.log("product length: " + this.props.cartProducts.length);*/
            
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
     // if(allowCountUpdate){
        //console.log("dispatched total cart qty");
      this.props.dispatch({
        type: GET_CART_QTY,
        payload: this.props.updateCart.totalCartQty
     })

     for(let i = 0; i < this.props.cartProducts.length; i++){
        totalCount = totalCount + this.props.cartProducts[i].productQuantity;
     }

     console.log("totalCount " + totalCount);
      
     this.props.dispatch({
      type: UPDATE_COUNT,
      payload: totalCount
   })
     allowCountUpdate = false;
  //  }
      
      }, 100); 
       
      console.log("totalRounded " + totalRounded);
      
      
    }

   /*loadLocalStorage = () => {
    let localStorageCart = [];
    
          let lskFiltered = [];
          let storageKeysInteger = [];
          let allValues = [];
          let uniqueValues = [];
          
          let index = 0;
          for(let i = 0; i < Object.keys(localStorage).length; i++){
              storageKeysInteger[i] = parseInt(Object.keys(localStorage)[i]);
            }
          for(let i = 0; i < storageKeysInteger.length; i++){
              if(storageKeysInteger[i] > 100000){
                lskFiltered[index] = storageKeysInteger[i];
                index++;
              }
              }

              lskFiltered.sort((a, b) => a-b);
            

          for(let i = 0; i < lskFiltered.length; i++){
              let temp = [];
              temp = localStorage.getItem(lskFiltered[i]);
              let tempFiltered = [];
              let index = 0;
            for(let i = 0; i < temp.length; i++){
              if(temp[i] !== ','){
              tempFiltered[index] = temp[i];
              allValues.push(tempFiltered[index]);
              
              index++;
          }
          }
        }
            
            uniqueValues = [...new Set(allValues)];

     for(let i = 0; i < uniqueValues.length; i++){
        localStorageCart[i] = JSON.parse(localStorage.getItem(uniqueValues[i]));
     }
     return localStorageCart;
    }*/


    deleteCart = () => {
        this.props.deleteCart();
        allowCountUpdate = false;
 }
 

 updateCart = () => {
  
  
  if(allowUpdateCartLocal){
  
  for(let i = 0; i < this.props.cartProducts.length; i++){
    localStorage.setItem(this.props.cartProducts[i].productId, JSON.stringify(this.props.cartProducts[i]));
    
  }
  
// when logged in --- production
  /*this.props.postCart(this.props.cartProducts);*/
  allowCountUpdate = true;
  
  
  allowUpdateCart(0);
  window.location.reload();
  
}
 }

 addTodo = (heading) => {
   console.log("Heading: " + JSON.stringify(heading));
   this.props.dispatch({type: SET_CART_PRODUCT_QUANTITY ,
    payload: {
    fieldValue: heading.fieldValue,
    prodId: heading.prodId
    }
    });

 }

deleteCartItemById(id) {
  
  let prodObj = {
    productId: id
  }

  console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddd " + id)

        let lskFiltered = [];
        let storageKeysInteger = [];
        let temp = [];
        let keysToErase = [];
        let totalCount = 0;
        let index = 0;
        for(let i = 0; i < Object.keys(localStorage).length; i++){
            storageKeysInteger[i] = parseInt(Object.keys(localStorage)[i]);
          }
        for(let i = 0; i < storageKeysInteger.length; i++){
            if(storageKeysInteger[i] > 100000){
              lskFiltered[index] = storageKeysInteger[i];
              index++;
            }
            }

            console.log("storageKeysInteger " + lskFiltered);
            
            for(let i = 0; i < lskFiltered.length; i++){
              if(localStorage.getItem(lskFiltered[i]) === id.toString()){
                temp[index] = lskFiltered[i];
                localStorage.removeItem(temp[index]);
                index++;
              }
            }

            //console.log("temp " + temp[1]);

            

            console.log("keys to erase " + keysToErase);

            setTimeout(() => {
              for(let i = 0; i < this.props.cartProducts.length; i++){
                totalCount = totalCount + this.props.cartProducts[i].productQuantity;
             }
             this.props.dispatch({
              type: UPDATE_COUNT,
              payload: totalCount
            });
             }, 20);
      
           
            
           
         

         console.log("totalCount " + totalCount);

        setTimeout(() => {if(totalCount == 0){
          console.log("bio u total countttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
          localStorage.clear();
          
          //window.location.reload();
       }}, 25); 
         
            
  
  this.props.deleteCartItem(prodObj); 
  
  allowCountUpdate = false;
  
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
          deleteCartProduct={(num) => this.deleteCartItemById(num)}  updateCartItems={() => this.updateCart()} 
          onSubmit={this.addTodo} />
          
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
                  {/*count === null || count === 0 ? <h2>You have no items</h2> : null*/}
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

export function allowUpdateCart(num){
  if(num === 1){
    allowUpdateCartLocal = true;
  }
  else allowUpdateCartLocal = false;
}

export function loadLocalStorage(){
  let localStorageCart = [];
  
        let lskFiltered = [];
        let storageKeysInteger = [];
        let allValues = [];
        let uniqueValues = [];
        
        let index = 0;
        for(let i = 0; i < Object.keys(localStorage).length; i++){
            storageKeysInteger[i] = parseInt(Object.keys(localStorage)[i]);
          }
        for(let i = 0; i < storageKeysInteger.length; i++){
            if(storageKeysInteger[i] > 100000){
              lskFiltered[index] = storageKeysInteger[i];
              index++;
            }
            }

            lskFiltered.sort((a, b) => a-b);
          

        for(let i = 0; i < lskFiltered.length; i++){
            let temp = [];
            temp = localStorage.getItem(lskFiltered[i]);
            let tempFiltered = [];
            let index = 0;
          for(let i = 0; i < temp.length; i++){
            if(temp[i] !== ','){
            tempFiltered[index] = temp[i];
            allValues.push(tempFiltered[index]);
            
            index++;
        }
        }
      }
          
          uniqueValues = [...new Set(allValues)];

   for(let i = 0; i < uniqueValues.length; i++){
      localStorageCart[i] = JSON.parse(localStorage.getItem(uniqueValues[i]));
   }
   return localStorageCart;
  }