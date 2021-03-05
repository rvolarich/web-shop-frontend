import React from 'react';
import { Button, Container, Form, Col, Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';
import { fetchPosts } from '../actions/postActions';

class InventoryItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          price: this.props.products.productPrice,
          stock: this.props.products.productQuantity
        }
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(){
      /*this.props.fetchPosts();
      console.log("been in inventory");*/
  }

    handlePrice(event){
        this.setState({...this.state, price: event.target.value});
    }

    handleStock(event){
      this.setState({stock: event.target.value});
  }

    handleUpdate(){

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
      <td style={{width: '120px'}}><Form><Form.Control onChange={this.handlePrice.bind(this)}value={this.state.price}/></Form></td>
      <td style={{width: '90px'}}><Form><Form.Control onChange={this.handleStock.bind(this)} value={this.state.stock}/></Form></td>
      <td>
        <Button style={{marginLeft: '20px', marginRight: '20px'}}>Update</Button>
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