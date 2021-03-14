import React from 'react';
import { Form, Container, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED, GET_CART_PRODUCTS, UPDATE_COUNT, GET_LOCAL_CART_PRODUCTS, SHOW_MODAL } from '../actions/types';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { loadLocalStorage, updateCount } from '../Cart';
import ModalElement from './ModalElement';



let isLog = false;



class SignUpForm extends React.Component{
    
    constructor (props) {
        super(props);
        this.state = { 
            country: '', 
            region: '' ,
            authData : {
            username: '',
            password: ''
            
        },
        allowCheckIsLogged: false,
        };
        
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.mergeCart = this.mergeCart.bind(this)
        
      }
    
      /*selectCountry (val) {
        this.setState({ country: val });
      }
    
      selectRegion (val) {
        this.setState({ region: val });
      }*/

      componentDidMount(){
        this.props.dispatch({
          type: GET_CART_PRODUCTS,
          payload: loadLocalStorage()
        });
        let totalCount = 0;
    setTimeout(() => {
      for(let i = 0; i < this.props.cartProducts.length; i++){
        totalCount = totalCount + this.props.cartProducts[i].productQuantity;
     }
     this.props.dispatch({
      type: UPDATE_COUNT,
      payload: totalCount
    });

    localStorage.setItem('count', this.props.count);
     }, 100);
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
        console.log(response.headers);
        
        
        
    }.bind(this));
    }

    handleClick = () => {
      this.setState({registerForm: true});
      console.log('Been in register:', this.state.registerForm);
    }

    closeModal = () => {
      this.props.dispatch({
        type: SHOW_MODAL,
        payload: false
      });
    }

    mergeCart = () => {
      console.log('bio u MergeCart')
      axios.post('http://127.0.0.1:8080/post/cart/local', 
      this.props.localCartProducts, {withCredentials:true})
    .then(response => response.data).then(() => localStorage.clear())
    .catch(function (error) {
      console.log(error);
    });
        
        this.setState({allowCheckIsLogged: true});
        this.closeModal();
      }
    

    

    postLogData = () => {
      console.log("authData " + JSON.stringify(this.state.authData));
      this.setState({allowCheckIsLogged: false});
        axios.post('http://127.0.0.1:8080/login', 
    this.state.authData, { withCredentials: true }

    ).then(response => {
        console.log(this.state.authData);
        this.props.dispatch({
            type: IS_LOGGED,
            payload: response.data
        });

        if(this.props.isLogged){
          
          this.props.dispatch({
            type: GET_LOCAL_CART_PRODUCTS,
            payload: loadLocalStorage()
            
          });

          localStorage.setItem('x_py35', this.state.authData.password);
          if(parseInt(localStorage.getItem('count')) > 0){
          this.props.dispatch({
            type: SHOW_MODAL,
            payload: true
          });
          
        }else{
          window.location.replace(localStorage.getItem('lastUrl'))
        }
         /* axios.post('http://127.0.0.1:8080/post/cart/local', this.props.localCartProducts, {withCredentials:true})
    .then(response => response.data)
    .then()
    .catch(function (error) {
      console.log(error);
    });*/
        }
        else{
          this.setState({allowCheckIsLogged: true});
        }
        
    });
    
    
    /*fetch('http://127.0.0.1:8080/login', {
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
    this.setState({allowCheckIsLogged: true});
    })
    .catch((error) => {
      console.error('Error:', error);
    });*/
        /*.then(response => {//do work});/*.then(axios.get('http://127.0.0.1:8080/login',{ withCredentials: true},
    this.props.isLogged
      
    ).then(function(response){
      console.log(response);
    }));*/

       
    
        
    
        console.log("all ok");
        
    }
    
    

    render(){
        
        const { isLogged, showModal, loginStatus } = this.props;
        const { allowCheckIsLogged } = this.state;
        
        

        
        
        return(
            <Container>

              {showModal ? <ModalElement mergeCartMod={() => this.mergeCart()} 
              modalTitle='Cart'
              modalLine1='There are items in the guest cart.' 
              modalLine2='Would you like to merge them with your saved items?' 
              input='cart' /> : null}
                
                
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
            
            <Button onClick={this.postLogData} 
            style={{marginTop:'10px', marginBottom:'10px'}}>Login</Button>
            <div>
              Don't have an account? <a href="/register" onClick={this.handleClick}>Sign up!</a>
            </div>
            <div>
            {allowCheckIsLogged ? isLogged ? window.location.replace(localStorage.getItem('lastUrl')) : 
            <div style={{color: 'red'}}>{loginStatus}</div> : null}
            </div>
            </Col>
            
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isLogged: state.posts.isLogged,
    username: state.posts.username,
    loginStatus: state.posts.loginStatus,
    keySequence: state.posts.loginStatus,
    count: state.posts.count,
    cartProducts: state.posts.cartProducts,
    localCartProducts: state.posts.localCartProducts,
    showModal: state.posts.showModal

    });

export default connect(mapStateToProps)(SignUpForm);