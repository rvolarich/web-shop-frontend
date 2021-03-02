import React from 'react';
import ShopItem from './ShopItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProducts } from './Repository2';
import { connect } from 'react-redux';
import { fetchPosts, getCartQty } from './actions/postActions';
import { GET_DATA, POST_DATA, INCREMENT, GET_CART_PRODUCTS  }  from './actions/types';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';


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
    /*let localStorageCart = [];
     let decrease = localStorage.length - 1;
     let keys = Object.keys(localStorage);
     for(let i = 0; i < localStorage.length; i++){
        localStorageCart[i] = JSON.parse(localStorage.getItem(keys[decrease]));
        decrease--;
     }
     this.props.dispatch({
      type: GET_CART_PRODUCTS,
      payload: localStorageCart
    });*/
    

    console.log('been in shop mount');
}
 render(){
   
  const { products } = this.props;
  const { count } = this.props;
  //const cookies = new Cookies();
 
//cookies.set('my', 'Pacman', { path: '/' });
//console.log(cookies.get('my')); // Pacman
  return (
    
    
    <div>
       
       {
products.map((product, index) =>
    <ShopItem product={product} key={index} />
        
    )
    
    }
   

</div>
       
    
  );
 }
}
function mapDispatchToProps(dispatch) {
  return{
    dispatch,
     ...bindActionCreators({ fetchPosts, getCartQty}, dispatch)
}
}

const mapStateToProps = state => ({
  products: state.posts.products
  
});

export default connect(mapStateToProps,mapDispatchToProps)(Shop);

export function count(){

  let total = 200;
  this.setState({total});
}