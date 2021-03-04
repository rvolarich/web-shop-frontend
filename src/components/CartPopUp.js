import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';

class CartPopUp extends React.Component{

    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: false
        });
        window.location.replace(localStorage.getItem('lastUrl'));
      }
    render(){
        return(
            <Modal
     
      show={this.props.showModal}
    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
          There are items in the guest cart.
        </p>
        <p>
          Would you like to merge them with your saved items?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.closeModal}>Do not merge</Button>
        <Button onClick={() => this.props.mergeCart()}>Merge</Button>
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
  
  export default connect (mapStateToProps, mapDispatchToProps)(CartPopUp);