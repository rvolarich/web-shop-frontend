import { Button } from 'react-bootstrap';
import React from 'react';


class SessionExpired extends React.Component{



    

render(){
    return(
        <div style={{margin:'auto', width:'67%'}}>
        <h4 style={{marginTop:'5%'}}>Your session has expired!</h4>
        <br />
        <Button href="/login">Login</Button>
        </div>
        
    )
}
    
}

export default SessionExpired