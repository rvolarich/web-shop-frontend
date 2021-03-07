import React from 'react';
import { Button, Container, Form, Col, Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';
import { fetchPosts } from '../actions/postActions';
import axios from 'axios';

class InventoryItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          productPriceQty:{
            productId: 0,
            productPriceString: '',
            productQuantity: ''
        }
        }
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(){
    
      this.setState({productPriceQty:{...this.state.productPriceQty, 
        productPriceString: this.props.product.productPrice, 
        productQuantity: this.props.product.productQuantity}});
      
      }

  validatePrice(s) {
    let rgx = /^[0-9]*\.?[0-9]*$/; // allows numbers and one dot
    return s.match(rgx);
}

validateStock(s) {
  let rgx = /^[0-9]*$/; // allows numbers only
  return s.match(rgx);
}

    handlePrice(event){
        if(this.validatePrice(event.target.value)){
          //let priceRounded = (Math.round(parseInt(event.target.value)).toFixed(2));
          this.setState({productPriceQty:{...this.state.productPriceQty, productPriceString: event.target.value}});
        }
        
    }

    handleStock(event){
      if(this.validateStock(event.target.value)){
        this.setState({productPriceQty:{...this.state.productPriceQty, productQuantity: event.target.value}});
      }
  }

    handleUpdate(){

      this.setState({productPriceQty:{...this.state.productPriceQty, 
                     productId: this.props.product.productId}});
        setTimeout(() => {axios.post('http://127.0.0.1:8080/products/update', this.state.productPriceQty,
        {withCredentials:true})
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        })}, 20)
      

      
    }

    handleDelete(){

    }

    closeModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: false
        });
        window.location.replace(localStorage.getItem('lastUrl'));
      }
    render(){

        const { product } = this.props;

        return(
            <Container>
                <Table responsive="lg" bordered hover style={{marginBottom: '0px'}}>
  
  <tbody>
    <tr>
      <td style={{width: '30px'}}>{product.productId}</td>
      <td style={{width: '300px'}}>{product.productName}</td>
      <td style={{width: '300px'}}>{product.productDescription}</td>
      <td style={{width: '120px'}}><Form><Form.Control onChange={this.handlePrice.bind(this)}
          value={this.state.productPriceQty.productPriceString}/></Form></td>
      <td style={{width: '90px'}}><Form><Form.Control onChange={this.handleStock.bind(this)} 
          value={this.state.productPriceQty.productQuantity}/></Form></td>
      <td>
        <Button style={{marginLeft: '20px', marginRight: '20px'}} 
                onClick={this.handleUpdate.bind(this)}>Update</Button>
        
        <Button variant="outline-danger">Delete</Button>
      
      </td>
    </tr>
    
  </tbody>
</Table>


            </Container>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
      dispatch,
       ...bindActionCreators({ fetchPosts }, dispatch)
  }
  }
  
  const mapStateToProps = state => ({
      showModal: state.posts.showModal,
      products: state.posts.products
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(InventoryItem);