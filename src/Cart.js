import React, {Component} from 'react';
import './App.css'
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import './Cart.css';
import CartItem from './CartItem'


import { getCartItems } from './Repository2';




class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            total: 0
        }
    }

    componentDidMount(){
       getCartItems().then((products) => {
           
           let total = 0;
           for(var i = 0; i < products.length; i++){
               total += products[i].price * products[i].quantity;
               
           }
           this.setState({ products, total});
        
       });
    }
render(){

    const { products, total} = this.state;
     
  return (
      
    <div>
        
        {
products.map((product) =>
        <CartItem product={product} />
            
        )
        
        }
    
    <h2>{total}</h2>
       
    
    </div>

        
        
        

        
    
    
  );
  }
}
export default Cart;