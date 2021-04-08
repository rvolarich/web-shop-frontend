import React from 'react';
import { Button, Container, Modal, Table, Form, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL, INVENTORY_STATUS, URLL, GET_DATA, DELETE_PRODUCT, IS_LOGGED, 
        SET_PRODUCT_PRICE } from '../actions/types';
import { fetchPosts } from '../actions/postActions';
import InventoryItem from './InvertoryItem';
import DragAndDrop from './DragAndDrop';
import FileList from './FileList';
import axios from 'axios';
import ModalElement from './ModalElement';
import { data } from 'jquery';
import ReactDOM from 'react-dom';


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
              productPriceQty:{
                productId: 0,
                productPriceString: '',
                productQuantity: ''
            },
              productId: 0,
              allowAddButton:false,
              showContainer:false
            
        }
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
        this.updateData = this.updateData.bind(this)
        
        //this.allowAddButtonKey = this.allowAddButtonKey.bind(this)
        //this.handleDrop = this.handleDrop.bind(this)
    }

   /* handleDrop = (files) => {
        this.setState({file: files})
      }*/

    

    componentDidMount(){

      
       
        
        setTimeout(() => {if(this.props.sessionExpired){
  
          window.location.replace(`${URLL}/sessionexp`)
        }}, 500)
          
            axios.get(`/logged_in?sessionExpired=${this.props.sessionExpired}`, 
            { withCredentials: true })
            .then(response => {
              console.log("logged_in = " + response.data) 
              this.props.dispatch({
                type: IS_LOGGED,
                payload: response.data
            });
            
            setTimeout(() => {
              this.setState({showContainer:true})
            }, 100)

            })
            .catch(error => {
              console.log("check login error", error);
            });    
     
  
          //this.props.fetchPosts();
          //console.log("been in inventory");
  
          
            axios.get('/products', {withCredentials:true})
            .then(response => response.data)
            .then(data => {
              this.props.dispatch({
              type: GET_DATA,
              payload: data
            })
          
             
          
          });
        
     
     
       
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

      updateData = () => {

        
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
        
        this.props.dispatch({
          type: DELETE_PRODUCT,
          payload: this.state.productId
        })
        axios({
          method: 'delete',
          url: '/products/del',
          data: {
            productId: this.state.productId
          },
          headers:{
            withCredentials:true
          }
        }).then(response => {
          this.props.dispatch({
            type: INVENTORY_STATUS,
            payload: response.data
          })
        }).then(() => {
          this.props.dispatch({
            type: SHOW_MODAL,
            payload: false
          });
         // window.location.reload();
        }).catch(err => {
          console.log(err);
        });
      }

      validatePrice(s) {
        console.log('been in validate price')
        let rgx = /^[0-9]*\.?[0-9]*$/; // allows numbers and one dot
        return s.match(rgx);
    }
    
    validateStock(s) {
      let rgx = /^[0-9]*$/; // allows numbers only
      return s.match(rgx);
    }

      handleName(event){
        //let nameLength = this.state.productData.productName.length;
        //console.log('name length ' + nameLength)
        if(event.target.value.length < 25){
        this.setState({productData:{...this.state.productData, productName: event.target.value}});
        this.allowAddButtonKey();
      }
      }
    
      handleDesc(event){
        if(event.target.value.length < 25){
        this.setState({productData:{...this.state.productData, productDescription: event.target.value}});
        this.allowAddButtonKey();
        }
      }
    
      handlePrice(event){
        if(this.validatePrice(event.target.value) && event.target.value.length < 15){
        this.setState({productData:{...this.state.productData, productPriceString: event.target.value}});
        this.allowAddButtonKey();
      }
      }
    
      handleQty(event){
        if(this.validateStock(event.target.value) && event.target.value.length < 9){
        this.setState({productData:{...this.state.productData, productQuantity: event.target.value}});
        this.allowAddButtonKey();
      }
      }
    
      handleInsert(){
    
        this.setState({productData:{...this.state.productData, productImage: localStorage.getItem('image')}})
    
        setTimeout(() => {axios.post('/products/insert', this.state.productData,
        {withCredentials:true})
        .then(response => {
          console.log(response);
          this.props.dispatch({
            type: INVENTORY_STATUS,
            payload: response.data
          })
        }).then(() => {
          console.log('insert return: ' + this.props.inventoryStatus)
          if(this.props.inventoryStatus === 'Product added successfully!'){
          window.location.reload();
        }
        })
        .catch(function(err){
          console.log(err);
        })}, 30);
      }
    render(){

        const { products, showModal } = this.props;
        return(
           
          <div style={{margin:'auto', width:'67%'}}>
            {this.state.showContainer ? this.props.adminLogged ? <div>
            <div style={{paddingLeft:'2%', marginTop:'30px', marginBottom:'20px'}}>
            <h4>Inventory</h4>
            </div>
            <ModalElement  input='inventory' modalLine1='Delete the item?' modalTitle='Inventory' 
                           modalLine2='The product will be removed from the main products list!'
                          handleDel={this.handleDelete}/>  
                
                
                {
                    products.map((product, index) => 
                    <InventoryItem product={product} keyId={index} key={index} getKey={(id) => this.showModal(id)} 
                    updateProductData={this.updateData}/>

                    
                    
                    )
                }

                
              
<Col style={{marginTop: '10px'}} xs={6}>
  <div style={{width:'80%', height:'30px', color:'green'}}> 
          {this.props.inventoryStatus.charAt(0) === 'E' ? <p><span style={{color:'red'}}>{this.props.inventoryStatus}</span></p>
          : <p><span style={{color:'green'}}>{this.props.inventoryStatus}</span></p>}
   </div>
    <div style={{marginBottom: '20px', marginTop: '10px'}}>
        <h6>
            Add new product:
        </h6>
    </div>

    <Form >

<Form.Group  controlId="productName">
      <Form.Label>Product Name</Form.Label>
      <Form.Control type="text" placeholder="" onChange={this.handleName.bind(this)}
        value={this.state.productData.productName}/>
    </Form.Group>
<Form.Group  controlId="productDescription">
      <Form.Label>Product description</Form.Label>
      <Form.Control type="text" placeholder="" onChange={this.handleDesc.bind(this)}
        value={this.state.productData.productDescription} />
    </Form.Group>
    <Form.Row>
    <Form.Group  as={Col} controlId="productPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" onChange={this.handlePrice.bind(this)}
        value={this.state.productData.productPriceString} />
    </Form.Group>
    <Form.Group  as={Col} controlId="productStock">
      <Form.Label>Quantity</Form.Label>
      <Form.Control type="text" placeholder="" onChange={this.handleQty.bind(this)}
        value={this.state.productData.productQuantity} /> 
    </Form.Group>
    </Form.Row>
</Form>
<FileList allowButtAdd={() => this.allowAddButtonKey()}/>

{this.state.allowAddButton ? <Button onClick={this.handleInsert.bind(this)} style={{marginBottom:'10px'}}>Add product</Button> :
<Button style={{marginBottom:'10px'}}  disabled >Add product</Button>}

<div style={{width:'80%', height:'30px', color:'green', marginBottom:'30px'}}> 
          {this.props.inventoryStatus.charAt(0) === 'E' ? <p><span style={{color:'red'}}>{this.props.inventoryStatus}</span></p>
          : <p><span style={{color:'green'}}>{this.props.inventoryStatus}</span></p>}
   </div>
</Col>
</div> : <div style={{minHeight:'410px', margin:'auto', marginTop:'150px'}}>
  <h3>You are not authorized<br />to access this page!</h3></div> : <div style={{minHeight:'410px'}}></div>}
</div>
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
      allowAddProduct: state.posts.allowAddProduct,
      inventoryStatus: state.posts.inventoryStatus,
      sessionExpired: state.posts.sessionExpired,
      adminLogged: state.posts.adminLogged
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(Inventory);

  