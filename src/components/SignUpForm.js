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



class SignUpForm extends React.Component{
    
    constructor (props) {
        super(props);
        this.state = { 
            country: '', 
            region: '' ,
            authData : {
            username: '',
            password: '',
            
        }
    
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        
      }
    
      /*selectCountry (val) {
        this.setState({ country: val });
      }
    
      selectRegion (val) {
        this.setState({ region: val });
      }*/

      componentDidMount(){
        //this.setState({ sessid: Cookies.get('SessionId') });
        //console.log('session cookie' + read_cookie('SESSION'));
        
      }

      handleChangeUsername(event){
        this.setState({ authData: {...this.state.authData , username : event.target.value }});
      }

      handleChangePassword(event){
        this.setState({ authData: {...this.state.authData , password : event.target.value }});
    }

    postAuthData = () => {
        console.log("authData: " + JSON.stringify(this.state.authData));
        axios.post('http://localhost:8080/reg', 
        this.state.authData).then(function (response){
        console.log(response.headers);
        
        
        //this.setState({isLogged: response});
    });
    }

    

    postLogData = () => {

        /*axios.post('http://127.0.0.1:8080/login', { withCredentials},
    this.state.authData, headers: 

    }).then(response => {
        console.log(this.state.authData);
        this.props.dispatch({
            type: IS_LOGGED,
            payload: response.data
        });
       
    });*/
    
    fetch('http://127.0.0.1:8080/login', {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.authData)
        
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.props.dispatch({
        type: IS_LOGGED,
        payload: data
    });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
        /*.then(response => {//do work});/*.then(axios.get('http://127.0.0.1:8080/login',{ withCredentials: true},
    this.props.isLogged
      
    ).then(function(response){
      console.log(response);
    }));*/

       
    
        
    
        console.log("all ok");
        
    }
    
    

    render(){
        
        const { isLogged } = this.props;

        
        
        return(
            <Container>
                
                <Col xs={6} >
            <div style={{marginTop: '50px', }}>
                
                <Form>
                
                <Form.Group controlId="formBasicEmail" style={{marginTop: '20px'}}>
                    <Form.Control type="email" placeholder="User name" onChange={this.handleChangeUsername} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{marginTop: '20px'}}>
                <Form.Control type="password" placeholder="Password" onChange={this.handleChangePassword}/>
                </Form.Group>
               
                
                </Form>
                <CountrySelect value={this.state.country}
          onChange={(val) => this.selectCountry(val)} style={{marginTop: '20px'}} />

            {isLogged ? <p>You are logged in!</p> : null }
            </div>
            <Button onClick={this.postAuthData} style={{marginLeft:'20px', marginTop:'100px'}}>Register</Button>
            <Button href="/shop" onClick={this.postLogData} style={{marginLeft:'20px', marginTop:'100px'}}>Login</Button>
            </Col>
            
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged
    });

export default connect(mapStateToProps)(SignUpForm);