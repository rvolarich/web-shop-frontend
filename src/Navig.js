import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Row,
        Navbar} from 'react-bootstrap';
import { render } from '@testing-library/react';
import { connect } from 'react-redux';
import { getCartQty } from './actions/postActions';

class Navig extends React.Component{

  componentDidMount(){
  
      //this.props.getCartQty();
      console.log('been in navig');
  }
  
    
  one = 1;
  navStyle = {
    color: 'white'
  };
  render(){
    const { count, isLogged } = this.props;
  return (
<Container>
    <Row style={{minHeight:'100px', background:'grey', alignContent:'center'}}>
    <h1 style={{color:'white', marginLeft:'30px'}}>Webshop</h1>
    </Row>
    
    <Navbar bg="light" variant="light">
     <Nav className="mr-auto">
      <Nav.Link href="/shop">Shop</Nav.Link>
      <Nav.Link href="/inv">Inventory</Nav.Link>
  <Nav.Link href="/cart">Cart <span style={{color: 'green'}}>{count}</span></Nav.Link>
      
      {isLogged ? <Nav.Link href="/login">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
      {isLogged ? <Nav.Link href="/login">My Profile</Nav.Link> : null}
    </Nav>
    </Navbar>
  
    
    

  </Container>

    /*<nav>
    <h1 className="nav">Webshop</h1>
    <ul className="navLinks">
       <Link style={navStyle} to="/shop">
        <li>Shop</li>
        </Link>
      <Link style={navStyle} to="/cart">
        <li>Cart</li>
        </Link>
        <Link style={navStyle} to="/inv">
      <li>Inventory</li>
      </Link>
      <Link style={navStyle} to="/signup">
        <li>SignUp</li>
        </Link>
        <Link style={navStyle} to="/login">
      <li>LogIn</li>
      </Link>
    </ul>
  </nav>*/
  );
  }
}
const mapStateToProps = state => ({
  count: state.posts.count,
  isLogged: state.posts.isLogged
});

export default connect(mapStateToProps)(Navig);