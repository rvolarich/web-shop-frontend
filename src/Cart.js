import React, {Children, Component} from 'react';
import './App.css'
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import './Cart.css';
import CartItem from './CartItem'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCartProducts, getCartQty, deleteCart } from './actions/postActions';
//import { getCartProducts } from './Repository2';




class Cart extends React.Component {
    constructor(props){
        super(props);
        /*this.state = {
            products: [],
            total: 0
        }*/
        this.deleteCart = this.deleteCart.bind(this)
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
        this.props.getCartProducts();
        this.props.getCartQty();
    }

    deleteCart = () => {
        this.props.deleteCart();
 }
    
render(){
    
    
    const { products, total, count} = this.props;
     
  return (
    <Container>
        
    <Row ><Button variant="outline-info" onClick={this.clickMe} 
              style={{marginTop:'40px', marginBottom:'20px'}}>Update cart</Button>
              <Button variant="outline-info" onClick={this.deleteCart} 
              style={{marginTop:'40px', marginBottom:'20px'}}>Clear cart</Button>
              
              </Row>
          <hr />      
      
    <div>
        
        {
products.map((product, index) =>
        <CartItem product={product} key={index}/>
            
        )
        
        }
    
    <h2>{total}</h2>
       
    
    </div>
    <div>
                  {count === null ? <h2>You have no items</h2> : null}
              </div>
        
    </Container>
        

        
    
    
  );
  }
}

const mapStateToProps = state => ({
    products: state.posts.cartProducts,
    count: state.posts.count
    
  });

export default connect (mapStateToProps, { getCartProducts, getCartQty, deleteCart })(Cart);