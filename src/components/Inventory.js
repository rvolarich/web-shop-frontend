import React from 'react';
import { Button, Container, Modal, Table, Form, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';
import { fetchPosts } from '../actions/postActions';
import InventoryItem from './InvertoryItem';
import DragAndDrop from './DragAndDrop';
import FileList from './FileList';
import axios from 'axios';
import ModalElement from './ModalElement';
import { data } from 'jquery';

class Inventory extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file:[],
            productData:{
                productName:'',
                productDescription:'',
                productPriceString:'',
                productQuantity:'',
                productImage:''
              },

              modalData:{
                modalTitle:'Inventory',
                modalLine1:'Delete the item?'
              },

              input:'inventory',
              productId: 0,
              allowAddButton:false
            
        }
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
        //this.allowAddButtonKey = this.allowAddButtonKey.bind(this)
        //this.handleDrop = this.handleDrop.bind(this)
    }

   /* handleDrop = (files) => {
        this.setState({file: files})
      }*/

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

      showModal = (id) => {
        this.setState({...this.state, productId: id})
        setTimeout(() => {console.log("iddddddddddd in inventoryyyyyy " + this.state.productId);}, 20)
        
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: true
        });
        
      }

      allowAddButtonKey = () => {
       setTimeout(() => {
         console.log('state: ' + JSON.stringify(this.state.productData))
        if(this.state.productData.productName !== '' && 
       this.state.productData.productDescription !== '' && this.state.productData.productPriceString !== '' && 
       this.state.productData.productQuantity !== '' && this.props.allowAddProduct === true){
        
        this.setState({allowAddButton:true})
      }
        else{
          this.setState({allowAddButton:false})
        }}, 20) 
      
      }

      componentDidUpdate(){
        //this.allowAddButtonKey();
      }

      handleDelete = () => {
        console.log('bio u handleDelete:' + this.state.productId)
        /*axios.delete('http://127.0.0.1:8080/products/del',
        {withCredentials:true})
        .then(function(response){
          console.log(response)
        })*/

        axios({
          method: 'delete',
          url: 'http://127.0.0.1:8080/products/del',
          data: {
            productId: this.state.productId
          },
          headers:{
            withCredentials:true
          }
        });
      }

      handleName(event){
        this.setState({productData:{...this.state.productData, productName: event.target.value}});
        this.allowAddButtonKey();
      }
    
      handleDesc(event){
        this.setState({productData:{...this.state.productData, productDescription: event.target.value}});
        this.allowAddButtonKey();
      }
    
      handlePrice(event){
        this.setState({productData:{...this.state.productData, productPriceString: event.target.value}});
        this.allowAddButtonKey();
        
      }
    
      handleQty(event){
        this.setState({productData:{...this.state.productData, productQuantity: event.target.value}});
        this.allowAddButtonKey();
      }
    
      handleInsert(){
        /*this.props.dispatch({
          type: PRODUCT_DATA,
          payload: this.state.productData
        })*/
    
        this.setState({productData:{...this.state.productData, productImage: localStorage.getItem('image')}})
    
        setTimeout(() => {axios.post('http://127.0.0.1:8080/products/insert', this.state.productData,
        {withCredentials:true})
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        })}, 30);
      }
    render(){

        const { products, showModal } = this.props;
        return(
            <Container style={{paddingLeft: 0, paddingRight: 0}}>

            <ModalElement  input={this.state.input} modalData={this.state.modalData} 
                          handleDel={this.handleDelete}/>  
                
                
                {
                    products.map((product, index) => 
                    <InventoryItem product={product} key={index} getKey={(id) => this.showModal(id)}/>

                    
                    
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
      <Form.Control type="text" placeholder="" onChange={this.handleName.bind(this)}
        />
    </Form.Group>
<Form.Group  controlId="productDescription">
      <Form.Label>Product description</Form.Label>
      <Form.Control type="text" placeholder="" onChange={this.handleDesc.bind(this)}
        />
    </Form.Group>
    <Form.Row>
    <Form.Group  as={Col} controlId="productPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" placeholder="" onChange={this.handlePrice.bind(this)}
        />
    </Form.Group>
    <Form.Group  as={Col} controlId="productStock">
      <Form.Label>Quantity</Form.Label>
      <Form.Control type="text" placeholder="" onChange={this.handleQty.bind(this)}
        />
    </Form.Group>
    </Form.Row>
</Form>
<FileList />

{this.state.allowAddButton ? <Button onClick={this.handleInsert.bind(this)} >Add product</Button> :
<Button onClick={this.handleInsert.bind(this)} disabled >Add product</Button>}

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
      products: state.posts.products,
      showModal: state.posts.showModal,
      allowAddProduct: state.posts.allowAddProduct
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(Inventory);

  