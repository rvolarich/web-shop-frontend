import React from 'react';
//import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';





class Shop extends React.Component {
 render(){
  return (
    
      <Container>
        <Row style={{minHeight:'200px', marginTop:'20px'}}>
          <Col xs={4}>
          <img src="/images/apple.jpg" alt=""></img>
          </Col>
          <Col xs={5}>
          
          </Col>
          <Col xs={3}>
          <Button style={{marginLeft:'120px', marginTop:'170px'}}>Add to cart</Button>
          </Col>
        </Row>
        <hr />
        <Row style={{minHeight:'200px'}}>
          
        </Row>
        <hr />
        <Row style={{minHeight:'200px'}}>
          
        </Row>
        <hr />
        <Row style={{minHeight:'200px'}}>
          
        </Row>
        <hr />
        <Row style={{minHeight:'200px'}}>
          
        </Row>
        <hr />

        
      </Container>
       
    
  );
 }
}

export default Shop;