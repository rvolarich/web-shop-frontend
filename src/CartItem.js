import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SET_CART_QTY, SET_CART_PRODUCT_QUANTITY, DELETE_CART_ITEM } from './actions/types';
import { getCartItemQty, getCartProducts, deleteCartItem } from './actions/postActions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
var x;
class CartItem extends React.Component{

    constructor(props){
        super(props);
        //this.state = {quantity: 0};
        
        this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCartItemById = this.deleteCartItemById.bind(this)
    }

    componentDidMount(){
      
      getCartItemQty();
      //this.setState({quantity: this.props.product.productQuantity})
      
      console.log("cartitem component did mount " + x);
    }


    /*handleChange = (event) => dispatch => {
      const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           this.setState({number: event.target.value})
        }
    }*/
    deleteCartItemById = () =>  {
      
      console.log("bio u delete: " + this.props.product.productName);
      this.props.deleteCartItem(parseInt(this.props.product.productId));
      }

    handleChange(event){
      console.log("handleChange: " + event.target.value);
      const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
          getCartProducts();
           this.props.dispatch({type: SET_CART_PRODUCT_QUANTITY ,
                    payload: {
                    fieldValue: event.target.value,
                    prodId: this.props.product.productId
                    }
                    });
        }
    }
      
    handleSubmit(event) {
      console.log(this.state);
      event.preventDefault();
    }

    

    render(){

        const {product} = this.props;
        //console.log("render " + this.state.quantity);
        return (

            <Container>
              
                <Row id={"cartChild"}>
                  <Col>
                  <img src={"data:image/jpg;base64," + product.productImage} style={{width:'9vw',
                             marginLeft: '50px', marginBottom: 'auto' }} alt=""></img>
                  </Col>
                  <Col>
                  <p style={{marginTop: '50px'}}>{product.productName}</p>
                  <p>{product.productDescription}</p>
                  <br />
                  <p><span style={{color: 'green'}}>In Stock:</span> {product.productQuantity} pieces</p>
                  </Col>
                  <Col style={{marginTop: '50px'}}>
                  <form onSubmit={this.handleSubmit}>
          <input key="index"
              type="number"
              defaultValue={product.productQuantity}
              onChange={this.handleChange}
              
               />
          
        </form>
        <h6 color="grey">Enter quantity</h6>
        
                  </Col>
                  <Col>
                  
                  
              <h6 style={{marginTop:'50px', marginLeft: '100px', marginBottom: 'auto'}}>EUR {product.productPrice}</h6>
              <Button variant="outline-danger" onClick={this.deleteCartItemById} 
                   style={{marginLeft:'100px', marginTop:'35px'}}>Remove</Button>
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
  number: state.posts.cartQtyState
  
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);