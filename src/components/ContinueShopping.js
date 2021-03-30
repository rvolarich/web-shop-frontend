import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class ContinueShopping extends React.Component{

    render(){
        
        
        return(
            <Link to={"/shop"}>
            <Button variant="outline-secondary" 
              style={{marginTop:'30px', marginBottom:'20px', marginLeft:'1%'}}>Continue shopping</Button>
              </Link>
        );
    }
}

export default ContinueShopping;