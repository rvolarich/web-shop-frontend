import React from 'react';
import ShopItem from './ShopItem'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProducts } from './Repository2';




class Shop extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        products: []
        
    }
}

componentDidMount(){
   getProducts().then((products) => {
       
       this.setState({ products });
    
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


   

</div>
       
    
  );
 }
}

export default Shop;