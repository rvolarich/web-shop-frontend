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
import { GET_DATA, POST_DATA, GET_CART_QTY, INCREMENT, SET_CART_PRODUCT_QUANTITY_LOCAL, KEY_SEQUENCE  }  from './actions/types';

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
            productImage: this.props.product.productImage
          }
          
        }

        this.clickMe = this.clickMe.bind(this)
        
    }

    /*incrementCart(){
      this.cartQty += 1;
    }*/
    componentDidMount(){
      //this.props.getCartQty();
    }

   clickMe = () => {
      
      var enablePost = true;
     /* getProductId().then((productIds) => {
        cartChildren(productIds.length + 1);
        for(var i = 0; i < productIds.length; i++){
          if(productIds[i] == this.props.product.productId){
            enablePost = false;
            console.log(enablePost);
            alert("The product is already in the cart");
            console.log(enablePost);
          }
          
          
      }
      
          this.setState({productIds: productIds});
          
      });*/
      
         
        this.props.dispatch({
          type: INCREMENT
        });
        /*let q = this.props.product.productId;
        let countQuantity;
        
        let setCompae = true;
        if(this.props.product.productId !== compare){
          compare = this.props.product.productId;
          countQuantity = 0;
        }
        else{
          countQuantity++;
        }*/
        /*let keys = Object.keys(localStorage);
        for(let i = 0; i < keys.length; i++){
          if(keys[i] === 'keySequence'){
            keySequence = localStorage.getItem('keySequence'); 
          }else{
            localStorage.setItem('keySequence', null);
          }
        }*/
        
        
        keySequence.push(this.props.product.productId);
        localStorage.setItem(Date.now(), keySequence);
        this.props.dispatch({
          type: KEY_SEQUENCE,
          payload: keySequence
        });
        /*let allowSequence = true;
        let keySequenceLocal = [];
        let keySequenceLocalFiltered = [];
        console.log("keysequenceBeforGet " + keySequence.length);
        keySequenceLocal = localStorage.getItem('keySequence');
        console.log("keysequenceLocal " + keySequenceLocal);
        
        let index = 0;
        for(let i = 0; i < keySequenceLocal.length; i++){
          if(keySequenceLocal[i] !== ','){
              keySequenceLocalFiltered[index] = keySequenceLocal[i];
              console.log("keysequenceFilteredIndex " + keySequenceLocalFiltered[index]);
              index++;
          }
          }
        

        for(let i = 0; i < keySequenceLocalFiltered.length; i++){
          for(let k = 0; k < keySequenceLocal.length; i++){
              if( keySequenceLocalFiltered[i] === keySequenceLocal[k]){
              console.log("allowSequence = false");
              allowSequence = false;
          }
        }
      }*/
        
        //console.log("keysequenceFiltered " + keySequenceLocal[1]);
       

       /* if(allowSequence){
          localStorage.setItem('keySequence', keySequenceLocalFiltered);
          console.log("keysequence " + keySequence);
        }*/
        
        
        //const newData = this.state.cartData.slice() //copy the array
        //newData[1] = 55 //execute the manipulations
        let newArray = {...this.state.cartData};
        console.log("This state prodqty: " + this.state.cartData.productQuantity);
        newArray= {...newArray, productQuantity: this.state.cartData.productQuantity + 1}
        this.setState({cartData: newArray})
        this.setCartQtyState();
        
        

        /*this.props.dispatch({
            type: SET_CART_PRODUCT_QUANTITY_LOCAL,
            payload: this.props.product
        });*/
        //localStorage.setItem(id, JSON.stringify(item));
        
        
        axios.post('http://127.0.0.1:8080/pcp', this.props.product).then(function (response) {
          console.log(response);
          //console.log("item: " + JSON.stringify(this.state.cartData));
          
        })
        .catch(function (error) {
          console.log(error);
        });

        
      }

      setCartQtyState = () => {
        let id = this.props.product.productId;
        setTimeout(function() { //Start the timer
          localStorage.setItem(id, JSON.stringify(this.state.cartData));
          //console.log("state cart data " + JSON.stringify (this.state.cartData))
      }.bind(this), 50)
    }
      

      /*buyNow = () => {
        const element = (
          <Container>
            
            
            </Container>
        )
        ReactDOM.render(element, document.getElementById('root'));

      }*/
      
    
  
    render(){
        const {product} = this.props;
        
        return(
<Container>
      
        <Row key={product.productId} style={{minHeight:'200px', marginTop:'20px'}}>
          <Col  xs={4}>
          <img className="rounded mb-0" alt="100x100" src="https://placehold.it/100x100" 
          src={"data:image/jpg;base64," + product.productImage} alt=""></img>
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
              <h5>Price: {product.productPrice}, EUR</h5>
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

const mapDispatchToProps = dispatch => ({
  dispatch               
});

export default connect(null, mapDispatchToProps)(ShopItem);