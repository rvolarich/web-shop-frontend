import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLL } from '../actions/types';
class Activation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tokenExpired:false,
            showContainer:false
        }
    }

componentDidMount(){
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token')
    console.log('token: ' + token)

    axios.get(`${URLL}/activate?token=${token}`, {withCredentials:true})
    .then(response => response.data)
    .then((data) => {
        console.log('act link: ' + data)
        this.setState({tokenExpired:data})
        setTimeout(() => {this.setState({showContainer:true})}, 100)
    })
}

render(){
    return(
        
        <div style={{margin:'auto', width:'67%', textAlign:'center', minHeight:'410px'}}> 
        {this.state.showContainer ? !this.state.tokenExpired ?
        <div><h4 style={{paddingTop:'90px', paddingBottom:'50px'}}>Activation link has expired!</h4></div> :
        <div>
        <h4 style={{paddingTop:'50px', paddingBottom:'50px'}}>You have successfully activated your account!</h4>

        <Link to={"/login"}>
        <Button>Login</Button>
        </Link>
        </div> : <div></div>}
        </div> 
    )
}
    
}

export default Activation