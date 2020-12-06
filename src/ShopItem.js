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
import { GET_DATA, POST_DATA, GET_CART_QTY, INCREMENT  }  from './actions/types';

class ShopItem extends React.Component{
   
  
  
    constructor(props){
        super(props);
        /*this.state = {
          productIds: [],
          count: 25
        }*/

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
        
        console.log("Bio u click me: " + this.props.product);
        axios.post('http://localhost:8080/pcp', this.props.product).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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