import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

class ShopItem extends React.Component{
    constructor(props){
        super(props);
        
    }
    

    render(){
        const {product} = this.props;
        return(
<Container>
        <Row style={{minHeight:'200px', marginTop:'20px'}}>
          <Col xs={4}>
          <img src={"data:image/jpg;base64," + product.product_image} alt=""></img>
          </Col>
          <Col xs={5} style={{marginTop:'80px'}}>
            <div>
        <h3 >{product.product_name}</h3>
           </div>
           <br />
           <div>
           <h4>{product.product_description}</h4>
           </div>
           <br />
            <div >
              <h6><span style={{color: 'green'}}>In Stock:</span> {product.product_quantity} pieces</h6>
            </div>
          </Col>
          <Col xs={3}>
            <div style={{marginTop:'30px', marginLeft: '60px'}}>
              <h5>Price: {product.product_price}, EUR</h5>
            </div>
            <br />
            
          <Button style={{marginLeft:'100px', marginTop:'90px'}}>Add to cart</Button>
          </Col>
        </Row>
        <hr />
        

        
      </Container>
        );
    }

}

export default ShopItem;