import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL, URLL } from '../actions/types';

class ModalInventory extends React.Component{

    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    componentDidMount(){
    
        this.showModal();
       
       
    }

    redirect = () => {
        //localStorage.setItem('lastUrl', `${URLL}/inv`)
    }

    closeModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: false
        });
        
        window.location.replace(localStorage.getItem('lastUrl'));
    
      }

      showModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: true
        });
      }
      

    render(){
        return(
            <div style={{margin:'auto', minHeight:'410px'}}>
            <Modal
     
      show={this.props.showModal}
    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
        Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
        In order to use the resorce you must be logged in with an administrator account!
        </p>
        <p>
        You can create it by selecting "Give me administrator authority" option when registering a new account!
        </p>
      </Modal.Body>
      <Modal.Footer>

        
        <Button onClick={this.closeModal} style={{marginRight:'15px'}}>Back</Button>
        
        
        <Button href="/login" onClick={this.redirect}>Login</Button>
        

      </Modal.Footer>
    </Modal>
    </div>
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
      showModal: state.posts.showModal,
      isLogged: state.posts.isLogged,
      adminLogged: state.posts.adminLogged 
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(ModalInventory);