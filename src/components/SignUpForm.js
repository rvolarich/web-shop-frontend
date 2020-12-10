import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED } from '../actions/types';
import Cookies from 'universal-cookie';



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
            
        },
        sessid: ''
        //isLogged: false
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
        //this.setState({ isLogged: isLog });
        //console.log(this.state.sessid);
        
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
        console.log("authData: " + JSON.stringify(this.state.authData));
        axios.post('http://localhost:8080/login', 
        this.state.authData).then(response => {
            console.log(response);
            //this.setState({isLogged: response.data});
            this.props.dispatch({
                type: IS_LOGGED,
                payload: response.data
            });
            console.log("Is Logged: " + this.props.isLogged) ;
        });
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
                <Form.Group controlId="formBasicPassword" style={{marginTop: '20px'}}>
                <Form.Control type="password" placeholder="Retype password" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" style={{marginTop: '20px'}}>
                    <Form.Control type="email" placeholder="Address line 1" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" style={{marginTop: '20px'}}>
                    <Form.Control type="email" placeholder="Address line 2" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" style={{marginTop: '20px'}}>
                    <Form.Control type="email" placeholder="City" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" style={{marginTop: '20px'}}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                
                </Form>
                <CountrySelect value={this.state.country}
          onChange={(val) => this.selectCountry(val)} style={{marginTop: '20px'}} />

            {isLogged ? <p>You are logged in!</p> : null }
            </div>
            <Button onClick={this.postAuthData} style={{marginLeft:'20px', marginTop:'100px'}}>Register</Button>
            <Button onClick={this.postLogData} style={{marginLeft:'20px', marginTop:'100px'}}>Login</Button>
            </Col>
            
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged
    });

export default connect(mapStateToProps)(SignUpForm);