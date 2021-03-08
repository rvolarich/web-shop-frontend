import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';

class ModalElement extends React.Component{

    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this)
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
        {this.props.modalData.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
        {this.props.modalData.modalLine1}
        </p>
        <p>
        {this.props.modalData.modalLine2}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {this.props.input == 'cart' ? <div>
        <Button onClick={this.closeModal}>Do not merge</Button>
        <Button onClick={() => this.props.mergeCart()}>Merge</Button> </div> :
        
        <div><Button onClick={this.closeModal}>Close</Button>
        <Button onClick={() => this.props.handleDel()}>Delete</Button></div>
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