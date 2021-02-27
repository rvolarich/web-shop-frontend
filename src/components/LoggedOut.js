import React from 'react';
import { Button, Container } from 'react-bootstrap';

class LoggedOut extends React.Component{

    render(){
        
        
        return(
            <div>
                <Container>
                <h3 style={{marginTop: '20px', marginBottom: '20px'}}>You are logged out!</h3>
                <div>
                <Button variant="outline-secondary"  href="/shop" 
            style={{marginTop:'10px'}}>Continue shopping</Button>
                </div>
                </Container>
            </div>
            
            
            
        )
    }
}



export default LoggedOut;