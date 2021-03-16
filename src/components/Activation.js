import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
class Activation extends React.Component{

componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token')
    console.log('token: ' + token)

    axios.get(`http://127.0.0.1:8080/activate?token=${token}`, {withCredentials:true})
}

render(){
    return(
        <Container>
        <h4 style={{marginTop:'5%'}}>You have successfully activated your account!</h4>
        </Container>
    )
}
    
}

export default Activation