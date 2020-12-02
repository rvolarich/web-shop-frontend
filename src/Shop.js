import React from 'react';
import ShopItem from './ShopItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProducts } from './Repository2';
import { connect } from 'react-redux';
import { fetchPosts, getCartQty } from './actions/postActions';
import { GET_DATA, POST_DATA, INCREMENT  }  from './actions/types';


class Shop extends React.Component {

  /*constructor(props){
    super(props);
    this.state = {
        products: [],
        total: 0
    }
    this.state.total = 200;
}*/

componentDidMount(){
   
  
  
  //getProducts().then((products) => {
       //let total = 20;
       //this.setState({ products });
    // });

    this.props.fetchPosts();
    this.props.getCartQty();

    console.log('been in shop mount');
}
 render(){
   
  const { products } = this.props;
  const { count } = this.props;
  return (
    
    
    <div>
       
       {
products.map((product, index) =>
    <ShopItem product={product} key={index} />
        
    )
    
    }

<button onClick={() => this.props.dispatch({type: INCREMENT, payload: 0})} style={{marginLeft:'100px', marginTop:'90px'}}>Increment</button>
   

</div>
       
    
  );
 }
}
/*const mapDispatchToProps = dispatch => ({
  dispatch               
});*/

const mapStateToProps = state => ({
  products: state.posts.products
  
});

export default connect(mapStateToProps, { fetchPosts, getCartQty })(Shop);

export function count(){

  let total = 200;
  this.setState({total});
}