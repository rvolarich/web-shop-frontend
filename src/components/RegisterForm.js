import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED } from '../actions/types';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';



let isLog = false;



class RegisterForm extends React.Component{
    
    constructor (props) {
        super(props);
        this.state = { 
            country: '', 
            region: '' ,
            authData : {
            username: '',
            password: ''
           },
           userExists: true,
           allowCheckUserExists : false

    
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.postAuthData = this.postAuthData.bind(this)
        
      }

      handleChangeUsername(event){
        this.setState({ authData: {...this.state.authData , username : event.target.value }});
      }

      handleChangePassword(event){
        this.setState({ authData: {...this.state.authData , password : event.target.value }});
    }

    postAuthData = () => {
        console.log("authData: " + JSON.stringify(this.state.authData));
        axios.post('http://127.0.0.1:8080/reg', 
        this.state.authData).then(function (response){
        console.log("registered: " + response.data);
        this.setState({userExists: response.data, allowCheckUserExists: true});
        }.bind(this));
    }

    handleClick = () => {
      
      console.log('Been in register:', this.state.registerForm);
    }
    
     render(){
        
        const { isLogged } = this.props;
        const { userExists } = this.state;
        const { allowCheckUserExists } = this.state;
        

        
        
        return(
            <Container>
                
                <Col xs={4} >
            <div style={{marginTop: '50px', }}>
                
                <Form>
                
                <Form.Group controlId="formBasicEmail" style={{marginTop: '20px'}}>
                    <Form.Control type="email" placeholder="e-mail" onChange={this.handleChangeUsername} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{marginTop: '20px'}}>
                <Form.Control type="password" placeholder="password" onChange={this.handleChangePassword}/>
                </Form.Group>
               
                
                </Form>

            
            </div>
            <Button  onClick={this.postAuthData} 
            style={{marginTop:'10px', marginBottom:'10px'}}>Register</Button>

            {allowCheckUserExists ? userExists ? window.location.replace("http://127.0.0.1:3000/login") : 
            <div style={{color: 'red'}}>Username not available! Please choose a different one.</div> : null}
            
            
            </Col>
            
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged
    });

export default connect(mapStateToProps)(RegisterForm);