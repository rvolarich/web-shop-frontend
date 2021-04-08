import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED } from '../actions/types';
import { Form, Row, Col, Button } from 'react-bootstrap';

class ChangePassword extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            
                username: '',
               
           allowEmailFormat: true,
           status: ''
        }
        this.validateEmail = this.validateEmail.bind(this)
        this.postData = this.postData.bind(this)
        }

        handleChangeUsername(event){        
            this.setState({username : event.target.value});
            
          }

          validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        postData = () => {
            if(!this.validateEmail(this.state.username)){
                this.setState({allowEmailFormat: false})
            }
            else{
                this.setState({status: 'Sending email address! Please wait a moment...'});
                let userData = {
                    username: this.state.username
                }
                console.log('username: ' + JSON.stringify(userData))
                axios.post('/pass', userData)
                .then(response => response.data)
                .then(data => {
                console.log("registered: " + data);
                this.setState({status: data});
                });
            }
        }

    render(){
        return(
            <div style={{margin:'auto', width:'67%', minHeight:'410px'}}>
                
                <div style={{marginTop:'50px', marginLeft:'30px'}}>
                <Row style={{paddingTop:'20px'}}> 
                <Form.Group controlId="formBasicEmail" style={{margin: '0px', width:'35%'}}>
                    <Form.Control type="email" placeholder="e-mail" onChange={this.handleChangeUsername.bind(this)} 
                    maxLength='50' value={this.state.username} />
                </Form.Group>
                <p style={{float:'right', marginLeft:'5px', color:'red'}}>*</p>
                {this.state.allowEmailFormat ? null :
                <p className="registerFormStatus" style={{color:'red'}}>Email address format error!</p>
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

export default connect(mapStateToProps)(ChangePassword);