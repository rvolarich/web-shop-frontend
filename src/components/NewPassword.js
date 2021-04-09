import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED, URLL } from '../actions/types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NewPassword extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            
                username: '',
                password: '',
                retypePass: '',
               
           allowEmailFormat: true,
           allowPassMatch: true,
           stateUrl: '',
           status: ''
        }
        this.handleChangePass = this.handleChangePass.bind(this)
        this.handleChangeRetypePass = this.handleChangeRetypePass.bind(this)
        
        this.validatePassword = this.validatePassword.bind(this)
        }

        componentDidMount(){

            const query = new URLSearchParams(window.location.search);
            const token = query.get('token')
            
            let urlString = window.location;
            
            let url = urlString.toString().slice(37, 90);
            
            this.setState({username:token, stateUrl:url})
            localStorage.setItem('lastUrl', `${URLL}/shop`);
            
        }

        handleChangePass(event){
          
            this.setState({password : event.target.value });
            
        }

        handleChangeRetypePass(event){
            this.setState({retypePass: event.target.value });
            
          }

        validatePassword(str)
            
            {
                const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                return re.test(str);
            }


        postData = () => {

            
            if(this.state.password !== this.state.retypePass){
                this.setState({allowPassMatch:false})
            }
            
            else if(this.validatePassword(this.state.password) && this.state.password === this.state.retypePass){
                this.setState({allowPassMatch:true})
                let userData = {
                    
                    username: this.state.username,
                    password: this.state.password

                }
                console.log('hi')
                axios.post(this.state.stateUrl, userData)
                .then(response => response.data)
                .then(data => {
                    this.setState({status: data})
                })
                    setTimeout(() => {
                        window.location.replace(`${URLL}/login`)
                    }, 1000)
            }
            
            
        }

    render(){
        return(
            <div style={{margin:'auto', width:'67%', minHeight:'410px'}}>
                
                <div style={{marginTop:'50px', marginLeft:'30px'}}>
              
                <Row style={{paddingTop:'20px'}}> 
                <Form.Group controlId="formBasicPassword" style={{margin: '0px', width:'35%'}}>
                <Form.Control type="password" placeholder="new password" onChange={this.handleChangePass}
                maxLength='20' minLength='6' value={this.state.password} />
                </Form.Group>
                
                <p style={{float:'right', marginLeft:'5px', color:'red'}}>*</p>
                {this.state.password === '' ?
                <p className="registerFormStatus" style={{color:'gray'}}>Min. 6, max. 20 characters,
                 [A-Z], [a-z], [0-9]</p> : this.validatePassword(this.state.password) ?
                <p className="registerFormStatus" style={{color:'green'}}>Password accepted!</p> : 
                <p className="registerFormStatus" style={{color:'red'}}>Password not accepted!</p>
                }   
                </Row>

                <Row style={{paddingTop:'20px'}}> 
                <Form.Group controlId="formBasicRTPassword" style={{margin: '0px', width:'35%'}}>
                <Form.Control type="password" placeholder="retype new password" onChange={this.handleChangeRetypePass}
                maxLength='20' value={this.state.retypePass} />
                </Form.Group>
                <p style={{float:'right', marginLeft:'5px', color:'red'}}>*</p>
                {this.state.allowPassMatch ? null :
                <p className="registerFormStatus" style={{color:'red'}}>Passwords do not match!</p>
                }
               </Row>
               
                </div>
                <Button variant="primary" type="submit"  onClick={this.postData} style={{marginTop: '30px', marginLeft:'15px'}}>
                        Submit
                    </Button>
                    <div style={{marginTop:'20px', marginLeft:'15px', color:'gray'}}>{this.state.status}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged,
    username: state.posts.username
    });

export default connect(mapStateToProps)(NewPassword);