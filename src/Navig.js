import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Row,
        Navbar} from 'react-bootstrap';

function Navig(){

    
    let one = 1;
  const navStyle = {
    color: 'white'
  };
  
  return (
<Container>
    <Row style={{minHeight:'100px', background:'grey', alignContent:'center'}}>
    <h1 style={{color:'white', marginLeft:'30px'}}>Webshop</h1>
    </Row>
    
    <Navbar bg="light" variant="light">
     <Nav className="mr-auto">
      <Nav.Link href="/shop">Shop</Nav.Link>
      <Nav.Link href="/inv">Inventory</Nav.Link>
      <Nav.Link href="/cart">Cart</Nav.Link>
      <Nav.Link href="/signup">SignUp</Nav.Link>
      <Nav.Link href="/photo">Login</Nav.Link>
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
export default Navig;