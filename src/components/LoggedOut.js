import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoggedOut extends React.Component{

    render(){
        
        
        return(
           
           <div style={{margin:'auto', minHeight:'410px', paddingTop:'90px', textAlign:'center'}}>
                
                <div style={{marginBottom: '20px'}}>
                <h3 >You are logged out!</h3>
                </div>

                <Link  to={"/shop"}>
                <Button variant="outline-secondary"  
            style={{marginTop:'10px'}}>Continue shopping</Button>
                </Link>
               
            </div>
            
            
            
        )
    }
}



export default LoggedOut;