import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { eraseLocalStorageProductKeys } from '../Cart';


class SessionExpired extends React.Component{


componentDidMount(){
    eraseLocalStorageProductKeys();
}
    

render(){
    return(
        <div style={{margin:'auto', minHeight:'410px', paddingTop:'90px', textAlign:'center'}}>
        <h3 style={{marginBottom:'20px'}}>Your session has expired!</h3>
        <br />
        <Link to={"/login"} >
        <Button variant="outline-info" style={{width:'18%'}}>Login</Button>
        </Link>
        </div>
        
    )
}
    
}

export default SessionExpired