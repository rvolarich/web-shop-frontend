import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SET_CART_QTY, SET_CART_PRODUCT_QUANTITY, GET_CART_QTY } from './actions/types';
import { getCartItemQty, getCartProducts, deleteCartItem } from './actions/postActions';
import { bindActionCreators } from 'redux';
import { allowConfirmButton } from './components/CartCalculator';

import axios from 'axios';
import { allowUpdateCart } from './Cart';
//var allowCountUpdate = new Boolean();
let allowUpdate = true;
class CartItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          fieldData: {
            input: '',
           prodId: null
          },
          qtyState: 0
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCartItemById = this.deleteCartItemById.bind(this)
    this.updateCartItemById = this.updateCartItemById.bind(this)
    this.validateStock = this.validateStock.bind(this)
    /*this.updateCart = this.updateCart.bind(this)*/
    }

    componentDidMount(){
      
      getCartItemQty();
      console.log("cartitem component did mount ");
      this.setState({...this.state, qtyState: this.props.product.productQuantity})
    }

    /*componentDidUpdate(){
  
      console.log("been in componentDidUpdate");
      if(allowCountUpdate){
      this.props.dispatch({
        type: GET_CART_QTY,
        payload: this.props.updateCart.totalCartQty
     })
    }
    }*/

    updateCartItemById = () => {
     /* this.props.postCart(this.props.products);
      allowCountUpdate = true;*/
     }

     validateStock(s) {
      let rgx = /^[0-9]*$/; // allows numbers only
      return s.match(rgx);
    }

    deleteCartItemById = () =>  {
      this.props.deleteCartProduct(this.props.product.productId);
      localStorage.removeItem(this.props.product.productId);
      window.location.reload();
      }

    handleChange(event){
      
      if(this.validateStock(event.target.value)){
        if(event.target.value >= this.props.product.productStock){
          this.setState({...this.state, qtyState: this.props.product.productStock})
          event.target.value = this.props.product.productStock;
        }else{
        this.setState({...this.state, qtyState: event.target.value})
      }
      }
      const re = /^[0-9\b]+$/;
     // if (event.target.value === '' || re.test(event.target.value)) {
        console.log("handleChange: " + event.target.value);
        
          getCartProducts();
          if(event.target.value <= 0){
            allowConfirmButton(1);
            }
          else{
            allowConfirmButton(5);
          }
          
          //this.setState({fieldData: {input: event.target.value, prodId: this.props.product.productId}});
           this.props.dispatch({type: SET_CART_PRODUCT_QUANTITY ,
                    payload: {
                    fieldValue: event.target.value,
                    prodId: this.props.product.productId
                    }
                    });

                    allowUpdateCart(1);
      //  }

    }
      
    handleSubmit(event) {
      event.preventDefault();
      
      
      this.setState({fieldData: {...this.state.fieldData, input: event.target.value, prodId: this.props.product.productId}});
      
      if(this.state.fieldData.input == ''){
        this.setState({fieldData: {...this.state.fieldData, input: this.props.product.productQuantity}});
        console.log("bio u handleSubmit");
        console.log("input " + this.state.fieldData.input);
        console.log("bio u prodId " + this.state.fieldData.prodId);
      }
      setTimeout(() => {this.props.onSubmit(this.state.fieldData);
        console.log(this.state);}, 50);
      
    }

    

    

    render(){

        const {product, isLogged, cartProductQuantity} = this.props;
        //console.log("render " + this.state.quantity);
        return (

            <Container>
              
                <Row id={"cartChild"}>
                  <Col>
                  <img src={product.productImage} style={{width:'9vw',
                              paddingTop: '45px' }} alt=""></img>
                  </Col>
                  <Col>
                  <p style={{marginTop: '50px'}}><span style={{fontWeight:'bold'}}>{product.productName}</span></p>
                  <p>{product.productDescription}</p>
                  <br />
                  {product.productStock <= 0 ? <p><span style={{color: 'red'}}>Out of stock</span></p> :
               <p><span style={{color: 'green'}}>In Stock:</span> {product.productStock}</p>} 
                  </Col>
                  <Col style={{marginTop: '50px'}}>
                  <form onSubmit={this.handleSubmit}>
                  <input key="index" type="text"  size="3" maxLength="10"
                  defaultValue={product.productQuantity}
              onChange={this.handleChange} value={this.state.qtyState}/>
              
              <Button type="submit" variant="outline-info" onClick={() => {this.props.updateCartItems()}} size="sm"
              style={{marginLeft:'65px', marginTop:'-58px'}}>Update</Button>
              </form>
               
          
       
        
        
                  </Col>
                  <Col>
                  
                  
              <h6 style={{marginTop:'50px', marginLeft: '10%', marginBottom: 'auto'}}>EUR 
              {parseFloat(product.productPrice).toFixed(2)}</h6>
              <Button variant="outline-danger" onClick={/*this.deleteCartItemById*/() => this.props.deleteCartProduct(this.props.product.productId)} 
                   style={{marginLeft:'10%', marginTop:'35px'}}>Remove</Button>
                  </Col>
                </Row>
                <hr />
            </Container>






            /*<tr id='tr1'>
            <td className="col-md-6">
              <div className="media">
                <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: '72px', height: '72px'}} /> </a>
                <div className="media-body">
                  <h4 className="media-heading">{product.name}</h4>
                  
                </div>
              </div></td>
            <td className="col-md-1" style={{textAlign: 'center'}}>
              <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={product.quantity} />
            </td>
            <td className="col-md-1 text-center"><strong>{product.price}</strong></td>
            <td className="col-md-1 text-center"><strong>{product.price * product.quantity}</strong></td>
            <td className="col-md-1">
              <button type="button" className="btn btn-danger">
                <span className="glyphicon glyphicon-remove" /> Remove
              </button></td>
          </tr>*/
        )
    }
}

/*const mapDispatchToProps = dispatch => ({
  dispatch               
});*/

function mapDispatchToProps(dispatch) {
  return{
    dispatch,
     ...bindActionCreators({ getCartProducts, getCartItemQty, deleteCartItem }, dispatch)
}
}

const mapStateToProps = state => ({
  number: state.posts.cartQtyState,
  updateCart: state.posts.updateCart,
  isLogged: state.posts.isLogged,
  cartProductQuantity: state.posts.cartProductQuantity
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);