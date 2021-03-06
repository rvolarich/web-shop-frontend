import React from 'react';
import { Button, Container, Modal, Table, Form, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';
import { fetchPosts } from '../actions/postActions';
import InventoryItem from './InvertoryItem';
import DragAndDrop from './DragAndDrop';
import FileList from './FileList';

class Inventory extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file:[]
        }
        this.closeModal = this.closeModal.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
    }

    handleDrop = (files) => {
        
        /*for (var i = 0; i < files.length; i++) {
         // if (!files[i].name) return
          fileList.push(files[i].name)
        }*/
        
        this.setState({file: files})
      }

    componentDidMount(){
        this.props.fetchPosts();
        console.log("been in inventory");
    }
    closeModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: false
        });
        window.location.replace(localStorage.getItem('lastUrl'));
      }
    render(){

        const { products } = this.props;
        return(
            <Container style={{paddingLeft: 0, paddingRight: 0}}>
                
                {
                    products.map((product, index) => 
                    <InventoryItem product={product} key={index} />

                    
                    
                    )
                }

<Col style={{marginTop: '40px'}} xs={6}>
    <div style={{marginBottom: '20px'}}>
        <h6>
            Add new product:
        </h6>
    </div>
<Form >

<Form.Group  controlId="productName">
      <Form.Label>Product Name</Form.Label>
      <Form.Control type="text" placeholder="" 
        />
    </Form.Group>
<Form.Group  controlId="productDescription">
      <Form.Label>Product description</Form.Label>
      <Form.Control type="text" placeholder="" 
        />
    </Form.Group>
    <Form.Row>
    <Form.Group  as={Col} controlId="productPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" placeholder="" 
        />
    </Form.Group>
    <Form.Group  as={Col} controlId="productStock">
      <Form.Label>Quantity</Form.Label>
      <Form.Control type="text" placeholder="" 
        />
    </Form.Group>
    </Form.Row>
</Form>
<FileList />

<Button>Add product</Button>
</Col>

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
  
  export default connect (mapStateToProps, mapDispatchToProps)(Inventory);