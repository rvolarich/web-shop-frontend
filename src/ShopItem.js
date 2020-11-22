import React from 'react';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { postCartProduct } from './Repository2';

class ShopItem extends React.Component{
    constructor(props){
        super(props);
        /*this.state = {
          productId: 0,
          productName: '',
          productDescription: '',
          productQuantity: 0,
          productPrice: 0.00
        }*/
    }

    clickMe = () => {
      
      //this.setState({num: this.props.product.product_name});
      
      
     
      
      //postCartProduct(this.props.product);
      axios.post('http://localhost:8080/pcp', this.props.product).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    

    render(){
        const {product} = this.props;
        return(
<Container>
        <Row style={{minHeight:'200px', marginTop:'20px'}}>
          <Col xs={4}>
          <img src={"data:image/jpg;base64," + product.productImage} alt=""></img>
          </Col>
          <Col xs={5} style={{marginTop:'80px'}}>
            <div>
        <h3 >{product.productName}</h3>
           </div>
           <br />
           <div>
           <h4>{product.productDescription}</h4>
           </div>
           <br />
            <div >
              <h6><span style={{color: 'green'}}>In Stock:</span> {product.productQuantity} pieces</h6>
            </div>
          </Col>
          <Col xs={3}>
            <div style={{marginTop:'30px', marginLeft: '60px'}}>
              <h5>Price: {product.productPrice}, EUR</h5>
            </div>
            <br />
            
          <Button onClick={this.clickMe} style={{marginLeft:'100px', marginTop:'90px'}}>Add to cart</Button>
          </Col>
          
        </Row>
        <hr />
        
        
        
      </Container>
        );
    }

}

export default ShopItem;