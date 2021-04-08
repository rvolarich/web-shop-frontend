import React from 'react';
import ShopItem from './ShopItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProducts } from './Repository2';
import { connect } from 'react-redux';
import { fetchPosts, getCartQty } from './actions/postActions';
import { GET_DATA, POST_DATA, INCREMENT, GET_CART_PRODUCTS, UPDATE_COUNT, URLL  }  from './actions/types';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { loadLocalStorage, updateCount } from './Cart';
import axios from 'axios';
import Footer from './components/Footer';


class Shop extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showContainer:false
    }
   this.updateCountNumber = this.updateCountNumber.bind(this)
}

componentDidMount(){

  //this.props.fetchPosts();
  
    axios.get('/products', {withCredentials:true})
    .then(response => response.data)
    .then(data => {
        this.props.dispatch({
        type: GET_DATA,
        payload: data
    });

    setTimeout(() => {
      this.setState({showContainer:true})
    }, 30)
  })
   
  setTimeout(() => {
    
    if(this.props.sessionExpired){

    window.location.replace(`${URLL}/sessionexp`)
  }
}, 30)
  
localStorage.setItem('lastUrl', `${URLL}/shop`);
    
setTimeout(() => {
  
  if(this.props.isLogged){
    
         /*axios.get('/getcart', {withCredentials:true})
         .then(response => response.data)
         .then(data => {
          for(let i = 0; i < data.length; i++){
            localStorage.setItem(data[i].productId, JSON.stringify(data[i]));
            localStorage.setItem(Date.now(), data[i].productId);
            for(let k = 0; k < 100; k++){}
        }
          this.props.dispatch({
          type: GET_CART_PRODUCTS,
          payload: loadLocalStorage()
         });
         this.updateCountNumber();
      }
         )*/

        /* axios.get('/get/user', { withCredentials:true})
          .then(response => {
            this.setState({userData:{...this.state.userData, email: response.data.username, nameName: this.props.username}})
        })*/

         }
         /* this.props.dispatch({
            type: GET_CART_PRODUCTS,
            payload: loadLocalStorage()
            });
  
          this.updateCountNumber();*/
        
        }, 30); 
   
    
   
    

    
}
updateCountNumber = () => {
  let totalCount = 0;

  for(let i = 0; i < this.props.cartProducts.length; i++){
    totalCount = totalCount + this.props.cartProducts[i].productQuantity;
 }
 
 this.props.dispatch({
  type: UPDATE_COUNT,
  payload: totalCount
});
}

 render(){
   
  const { products } = this.props;
  const { count } = this.props;
  //const cookies = new Cookies();
 
//cookies.set('my', 'Pacman', { path: '/' });
//console.log(cookies.get('my')); // Pacman
  return (
    
    
    <div style={{margin:'auto', width:'67%', minHeight:'410px'}}>
      {this.state.showContainer ? <div>
       {
products.map((product, index) =>
    <ShopItem product={product} key={index} />
        
    )
    
    }
   </div> : <div style={{color:'gray', marginTop:'20px', textAlign:'center'}}>loading shop...</div>}
              
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
  products: state.posts.products,
  cartProducts: state.posts.cartProducts,
  isLogged: state.posts.isLogged,
  sessionExpired: state.posts.sessionExpired
});

export default connect(mapStateToProps,mapDispatchToProps)(Shop);

export function count(){

  let total = 200;
  this.setState({total});
}