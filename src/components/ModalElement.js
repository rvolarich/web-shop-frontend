import React from 'react';
import axios from 'axios';
import { Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GET_CART_PRODUCTS, SHOW_MODAL } from '../actions/types';
import { eraseLocalStorageProductKeys } from '../Cart';

class ModalElement extends React.Component{

    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.closeModalMerge = this.closeModalMerge.bind(this)
    }

    closeModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: false
        });
        if(this.props.input === 'cart'){
        window.location.replace(localStorage.getItem('lastUrl'));
      }
      }

      closeModalMerge = () => {
       
        eraseLocalStorageProductKeys();

        axios.get('/getcart', { withCredentials:true })
        .then(response => response.data)
        .then(data => {
          
          if(data.length !== null)
          for(let i = 0; i < data.length; i++){
            localStorage.setItem(data[i].productId, JSON.stringify(data[i]))
            localStorage.setItem(Date.now(), data[i].productId)
            for(let k = 0; k < 10000000; k++){}
          }

          this.props.dispatch({
            type: SHOW_MODAL,
            payload: false
          });
        
          if(this.props.input === 'cart'){
            window.location.replace(localStorage.getItem('lastUrl'));
          }
        })
       }


    render(){
        return(
            <Modal
     
      show={this.props.showModal}
    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
        {this.props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
        {this.props.modalLine1}
        </p>
        <p>
        {this.props.modalLine2}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {this.props.input == 'cart' ? <div>
        <Button onClick={this.closeModalMerge} style={{marginRight:'15px'}}>Do not merge</Button>
        <Button onClick={() => this.props.mergeCartMod()}>Merge</Button> </div> : null}
        
        {this.props.input == 'inventory' ? 
        <div><Button onClick={this.closeModal} style={{marginRight:'15px'}}>Back</Button>
        <Button onClick={() => this.props.handleDel()} variant="danger">Delete</Button></div> : null
        }

        {this.props.input == 'profile' ? 
        <div><Button onClick={this.closeModal} style={{marginRight:'15px'}}>Back</Button>
        <Button onClick={() => this.props.handleDelUser()} variant="danger">Delete</Button></div> : null
        }

      </Modal.Footer>
    </Modal>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
      dispatch,
       ...bindActionCreators({ }, dispatch)
  }
  }
  
  const mapStateToProps = state => ({
      showModal: state.posts.showModal
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(ModalElement);