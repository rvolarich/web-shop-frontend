import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SET_CART_QTY, SET_CART_PRODUCT_QUANTITY, GET_CART_QTY } from './actions/types';
import { getCartItemQty, getCartProducts, deleteCartItem } from './actions/postActions';
import { bindActionCreators } from 'redux';
import { allowConfirmButton } from './components/CartCalculator';

import axios from 'axios';
//var allowCountUpdate = new Boolean();
let allowUpdate = true;
class CartItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          fieldData: {
            input: '',
           prodId: null}
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCartItemById = this.deleteCartItemById.bind(this)
    this.updateCartItemById = this.updateCartItemById.bind(this)
    /*this.updateCart = this.updateCart.bind(this)*/
    }

    componentDidMount(){
      
      getCartItemQty();
      console.log("cartitem component did mount ");
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

    deleteCartItemById = () =>  {
      //this.props.deleteCartProduct(this.props.product.productId);
      localStorage.removeItem(this.props.product.productId);
      window.location.reload();
      }

    handleChange(event){
      
      
      const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
        console.log("handleChange: " + event.target.value);
          getCartProducts();
          if(event.target.value <= 0){
            allowConfirmButton(1);
          }
          else{
            allowConfirmButton(5);
          }
          if(event.target.value > this.props.product.productStock){
            event.target.value = this.props.product.productStock;
          }
          //this.setState({fieldData: {input: event.target.value, prodId: this.props.product.productId}});
           this.props.dispatch({type: SET_CART_PRODUCT_QUANTITY ,
                    payload: {
                    fieldValue: event.target.value,
                    prodId: this.props.product.productId
                    }
                    });

                    this.props.allowCartUpdate(1);
        }

    }
      
    handleSubmit(event) {
      console.log(this.state);
      event.preventDefault();
      this.setState({fieldData: {input: event.target.value, prodId: this.props.product.productId}});
      this.props.onSubmit(this.state.fieldData);
    }

    

    

    render(){

        const {product, isLogged, cartProductQuantity} = this.props;
        //console.log("render " + this.state.quantity);
        return (

            <Container>
              
                <Row id={"cartChild"}>
                  <Col>
                  <img src={"data:image/jpg;base64," + product.productImage} style={{width:'9vw',
                              marginBottom: 'auto' }} alt=""></img>
                  </Col>
                  <Col>
                  <p style={{marginTop: '50px'}}>{product.productName}</p>
                  <p>{product.productDescription}</p>
                  <br />
                  {product.productStock <= 0 ? <p><span style={{color: 'red'}}>Out of stock</span></p> :
               <p><span style={{color: 'green'}}>In Stock:</span> {product.productStock}</p>} 
                  </Col>
                  <Col style={{marginTop: '50px'}}>
                  <form onSubmit={this.handleSubmit}>
                  <input key="index" type="text"  size="3" 
                  defaultValue={product.productQuantity}
              onChange={this.handleChange} />
              
              <Button type="submit" variant="outline-info" onClick={() => {this.props.updateCartItems()}} size="sm"
              style={{marginLeft:'65px', marginTop:'-58px'}}>Update</Button>
              </form>
               
          
       
        
        
                  </Col>
                  <Col>
                  
                  
              <h6 style={{marginTop:'50px', marginLeft: '100px', marginBottom: 'auto'}}>EUR {product.productPrice}</h6>
              <Button variant="outline-danger" onClick={this.deleteCartItemById/*() => this.props.deleteCartProduct(this.props.product.productId)*/} 
                   style={{marginLeft:'80px', marginTop:'35px'}}>Remove</Button>
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