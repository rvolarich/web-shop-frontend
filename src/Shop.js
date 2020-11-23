import React from 'react';
import ShopItem from './ShopItem'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProducts } from './Repository2';




class Shop extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        products: [],
        total: 0
    }
}

componentDidMount(){
   getProducts().then((products) => {
       let total = 20;
       this.setState({ products, total });
    
   });
}
 render(){
  const { products } = this.state;
  return (
    
    <div>
        
    {
products.map((product) =>
    <ShopItem product={product} />
        
    )
    
    }

<div><h2>{this.state.total}</h2></div>
   

</div>
       
    
  );
 }
}

export default Shop;