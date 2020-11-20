import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

class ShopItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {quantity: 1}
    }
    

    render(){
        const {product} = this.props;
        return(
<Container>
        <Row style={{minHeight:'200px', marginTop:'20px'}}>
          <Col xs={4}>
          <img src="/images/navarro_ship.jpg" alt=""></img>
          </Col>
          <Col xs={5} style={{marginTop:'80px'}}>
            <div>
           <h3 >Cruise ship Navarro</h3>
           </div>
           <br />
           <div>
           <h4>Dreamliner</h4>
           </div>
           <br />
            <div >
              <h6>In Stock: 5 pieces</h6>
            </div>
          </Col>
          <Col xs={3}>
            <div style={{marginTop:'30px', marginLeft: '60px'}}>
              <h5>Price: 2.99, EUR</h5>
            </div>
            <br />
            <div style={{marginTop:'20px', marginLeft: '73px'}}>
              <h6>In Stock: 5 pieces</h6>
            </div>
          <Button style={{marginLeft:'100px', marginTop:'60px'}}>Add to cart</Button>
          </Col>
        </Row>
        <hr />
        

        
      </Container>
        );
    }

}

export default ShopItem;