import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap';
import { Container, Nav, Row,
        Navbar} from 'react-bootstrap';
import { render } from '@testing-library/react';
import { connect } from 'react-redux';
import { getCartQty } from './actions/postActions';
import { SHOW_MODAL } from './actions/types';
import { Link } from 'react-router-dom';
import ModalInventory from './components/ModalInventory';

class Navig extends React.Component{
  
  showModal(){
    this.props.dispatch({
      type: SHOW_MODAL,
      payload: true
    })
  }
    
  one = 1;
  navStyle = {
    color: 'white'
  };
  render(){
    const { count, isLogged, username } = this.props;
  return (
    

    <div style={{margin:'auto', width:'100%'}}>
    
    <Navbar bg="light" variant="light">
     <Nav className="mr-auto" style={{paddingLeft:'16.2%'}}>
     <Link to={"/"} className="nav-link">Home</Link>
     <Link to={"/shop"} className="nav-link">Shop</Link>
      <Link className="nav-link" {... this.props.isLogged && this.props.adminLogged ? {to: '/inv'} : {to: '/log'} } >Inventory</Link>
  <Link to={"/cart"} className="nav-link">Cart <span style={{color: 'green'}}>{count === 0 ? null : count}</span></Link>
      
      {isLogged ? <Link to={"/logout"} className="nav-link">Logout</Link> : <Link to={"/login"} className="nav-link">Login</Link>}
      {isLogged ? <Link to={"/profile"} className="nav-link">My Profile</Link> : null}
      {isLogged ? <div style={{marginLeft: '11px', marginTop: '8px', color: 'gray'}}>Welcome, {username}</div> : null}
    </Nav>
    </Navbar>

    

  </div>
    
  );
  }
}
const mapStateToProps = state => ({
  count: state.posts.count,
  isLogged: state.posts.isLogged,
  adminLogged: state.posts.adminLogged,
  username: state.posts.username
});

export default connect(mapStateToProps)(Navig);