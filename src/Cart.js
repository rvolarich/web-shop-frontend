import React, {Component} from 'react';
import './App.css'
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import './Cart.css';
import CartItem from './CartItem'
import { Container, Row, Col, Button } from 'react-bootstrap';


import { getCartProducts } from './Repository2';




class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            total: 0
        }
    }

    componentDidMount(){
       getCartProducts().then((products) => {
           let total = 0;
           if(products != null){
            for(var i = 0; i < products.length; i++){
                total += products[i].productPrice * products[i].productQuantity;
                
            }
            this.setState({ products, total});
                
           }
           /*else{
            total = 0;
            this.setState({total});
        }*/
       });
    }

    
render(){
    
    const { products, total} = this.state;
     
  return (
    <Container>
    <Row ><Button variant="outline-info" onClick={this.clickMe} 
              style={{marginTop:'40px', marginBottom:'20px'}}>Update cart</Button></Row>
          <hr />      
      
    <div>
        
        {
products.map((product) =>
        <CartItem product={product} />
            
        )
        
        }
    
    <h2>{total}</h2>
       
    
    </div>

        
    </Container>
        

        
    
    
  );
  }
}
export default Cart;