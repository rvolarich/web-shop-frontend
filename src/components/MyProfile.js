import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SHOW_MODAL } from '../actions/types';
import { Form, Row, Col, Container } from 'react-bootstrap';
import CountrySelect from 'react-bootstrap-country-select';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import axios from 'axios';

class MyProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userData: {
                nameName:'',
                surname:'',
                email:'',
                password: localStorage.getItem('x_py35'),
                address:'',
                zip:'',
                city:'',
                country:''
                }
        }
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(){
      console.log("password: " + this.state.userData.password);
    }

    closeModal = () => {
        this.props.dispatch({
          type: SHOW_MODAL,
          payload: false
        });
        window.location.replace(localStorage.getItem('lastUrl'));
      }

      handleChangeName(event){
        this.setState({ userData: {...this.state.userData , nameName : event.target.value }});
      }

      handleChangeSurname(event){
        this.setState({ userData: {...this.state.userData , surname : event.target.value }});
    }

    handleChangeEmail(event){
        this.setState({ userData: {...this.state.userData , email : event.target.value }});
    }

    handleChangePassword(event){
        this.setState({ userData: {...this.state.userData , password : event.target.value }});
    }

    handleChangeAddress(event){
        this.setState({ userData: {...this.state.userData , address : event.target.value }});
    }

    handleChangeZip(event){
        this.setState({ userData: {...this.state.userData , zip : event.target.value }});
    }

    handleChangeCity(event){
        this.setState({ userData: {...this.state.userData , city : event.target.value }});
    }

    handleChangeCountry(event){
        this.setState({ userData: {...this.state.userData , country : event.target.value }});
    }

    handleSubmit(event){
        event.preventDefault();
        axios.put('http://127.0.0.1:8080/users/update', this.state.userData,
        { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.log("error " + error);
        });
        //console.log("user data " + JSON.stringify(this.state.userData));
    }
    render(){
        return(
            <Container>
                
                <Col xs={6}>
            <Form style={{marginTop: '20px'}}>
            <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="" 
      onChange={this.handleChangeName.bind(this)} value={this.state.userData.nameName} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridSurname">
      <Form.Label>Surname</Form.Label>
      <Form.Control type="text" placeholder=""
      onChange={this.handleChangeSurname.bind(this)} value={this.state.userData.surname} />
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" 
      onChange={this.handleChangeEmail.bind(this)} value={this.state.userData.email}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" 
      onChange={this.handleChangePassword.bind(this)} value={this.state.userData.password}/>
    </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} xs={8} controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="" 
    onChange={this.handleChangeAddress.bind(this)} value={this.state.userData.address}/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control onChange={this.handleChangeZip.bind(this)} value={this.state.userData.zip}/>
    </Form.Group>
    </Form.Row>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control onChange={this.handleChangeCity.bind(this)} value={this.state.userData.city}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      
      <Form.Control value={this.state.userData.country} onChange={this.handleChangeCountry.bind(this)}/>
        
        
      
    </Form.Group>

    
  </Form.Row>

  

  <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)} style={{marginTop: '10px'}}>
    Submit
  </Button>
</Form>
</Col>

</Container>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
      dispatch,
       ...bindActionCreators({ }, dispatch)
  }
  }
  
  const mapStateToProps = state => ({
      showModal: state.posts.showModal
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(MyProfile);