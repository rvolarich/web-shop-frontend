import React from 'react';
import { Form, Container, Col, Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IS_LOGGED, GET_CART_PRODUCTS, UPDATE_COUNT, GET_LOCAL_CART_PRODUCTS, SHOW_MODAL, URLL } from '../actions/types';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { eraseLocalStorageProductKeys, loadLocalStorage, updateCount } from '../Cart';
import ModalElement from './ModalElement';
import { getCartProducts } from '../actions/postActions';
import { bindActionCreators } from 'redux';




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
            stayLogged: false
            
        },
        allowCheckIsLogged: false,
        };
        
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleStayLogged = this.handleStayLogged.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.mergeCart = this.mergeCart.bind(this)
        this.deleteLocalStorageProductKeys = this.deleteLocalStorageProductKeys.bind(this)
      }
    
      /*selectCountry (val) {
        this.setState({ country: val });
      }
    
      selectRegion (val) {
        this.setState({ region: val });
      }*/

      componentDidMount(){

        setTimeout(() => {if(this.props.sessionExpired){
      
          window.location.replace(`${URLL}/sessionexp`)
        }
      }, 100)

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
      
     localStorage.setItem('lastUrl', `${URLL}/login`);
    
    }

      handleChangeUsername(event){
        this.setState({ authData: {...this.state.authData , username : event.target.value }});
      }

      handleChangePassword(event){
        this.setState({ authData: {...this.state.authData , password : event.target.value }});
    }

    handleStayLogged(event){
      this.setState({ authData: {...this.state.authData , stayLogged : event.target.checked }});
      //setTimeout(() => {console.log(this.state.authData.stayLogged)}, 0) 
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
      
    /*  this.props.dispatch({
        type: GET_LOCAL_CART_PRODUCTS,
        payload: loadLocalStorage()
      })
      let objectsToErase = [];
      let cartProducts = [...this.props.cartProducts]

            for(let i = 0; i < cartProducts.length; i++){
              localStorage.setItem(Date.now(), cartProducts[i].productId)
              for(let i = 0; i < 10000000; i++){}
              for(let k = 0; k < this.props.localCartProducts.length; k++){
                if(cartProducts[i].productId === this.props.localCartProducts[k].productId){
                  cartProducts[i].productQuantity += this.props.localCartProducts[k].productQuantity;
                  localStorage.setItem(cartProducts[i].productId, JSON.stringify(cartProducts[i]))
                  objectsToErase.push(cartProducts[i].productId)
                  //console.log('objects to erase u posLog: ' + objectsToErase)
                }
                  
                }
                
            }
            
            let dataReduced = [];
            
            
            for(let i = 0; i < cartProducts.length; i++){
              for(let k = 0; k < objectsToErase.length; k++){
                if(cartProducts[i].productId === objectsToErase[k]){
                  cartProducts.splice(i, 1)
                 
                }
              }
            }

            for(let i = 0; i < this.props.localCartProducts.length; i++){
              for(let k = 0; k < objectsToErase.length; k++){
                if(this.props.localCartProducts[i].productId === objectsToErase[k]){
                  this.props.localCartProducts.splice(i, 1)
                  
                }
              }
            }

            if(cartProducts.length !== null){
            for(let i = 0; i < cartProducts.length; i++){
              dataReduced.push(cartProducts[i])
            }
          }

          if(this.props.localCartProducts.length !== null){
            for(let i = 0; i < this.props.localCartProducts.length; i++){
              dataReduced.push(this.props.localCartProducts[i])
            }
          }
            
          if(dataReduced.length !== null){
            for(let i = 0; i < dataReduced.length; i++){
              localStorage.setItem(dataReduced[i].productId, JSON.stringify(dataReduced[i]))
              localStorage.setItem(Date.now(), dataReduced[i].productId)
              for(let i = 0; i < 10000000; i++){}
            }
          }*/
      
        setTimeout(() => {this.setState({allowCheckIsLogged: true});}, 30) 
        this.closeModal();
      }
   

      deleteLocalStorageProductKeys = () => {
        let index = 0;
        let lskFiltered = [];
        let storageKeysInteger = [];
        for(let i = 0; i < Object.keys(localStorage).length; i++){
          storageKeysInteger[i] = parseInt(Object.keys(localStorage)[i]);
        }
      for(let i = 0; i < storageKeysInteger.length; i++){
          if(storageKeysInteger[i] > 0){
            lskFiltered[index] = storageKeysInteger[i];
            index++;
          }
          }

          for(let i = 0; i < lskFiltered.length; i++){
            localStorage.removeItem(lskFiltered[i])
          }
          
       }
    

    postLogData = () => {
      
      this.setState({allowCheckIsLogged: false});
      this.props.dispatch({
        type: GET_LOCAL_CART_PRODUCTS,
        payload: loadLocalStorage()
        
      });
      axios.post('/login', 
      this.state.authData, { withCredentials: true }

      ).then(response => {
       
        this.props.dispatch({
            type: IS_LOGGED,
            payload: response.data
        });
        console.log('bio u login: ')
        if(this.props.isLogged){
          
          axios.get('/getcart', { withCredentials:true })
          .then(response => response.data)
          .then(data => {
           
           this.props.dispatch({
             type: GET_CART_PRODUCTS,
             payload: data
           })
           
            let objectsToErase = [];
            for(let i = 0; i < data.length; i++){
             // console.log('data u login: ' + data[i].productId)
              localStorage.setItem(Date.now(), data[i].productId)

              for(let i = 0; i < 10000000; i++){}
              for(let k = 0; k < this.props.localCartProducts.length; k++){
                if(data[i].productId === this.props.localCartProducts[k].productId){
                  data[i].productQuantity += this.props.localCartProducts[k].productQuantity;
                  localStorage.setItem(data[i].productId, JSON.stringify(data[i]))
                  objectsToErase.push(data[i].productId)
                //  console.log('objects to erase u posLog: ' + objectsToErase)
                }
                  //localStorage.setItem(this.props.localCartProducts[k].productId, JSON.stringify(this.props.localCartProducts[k]))
                }
                
            }
            
            let dataReduced = [];
            
            
            for(let i = 0; i < data.length; i++){
              for(let k = 0; k < objectsToErase.length; k++){
                if(data[i].productId === objectsToErase[k]){
                  data.splice(i, 1)
                 
                }
              }
            }

            for(let i = 0; i < this.props.localCartProducts.length; i++){
              for(let k = 0; k < objectsToErase.length; k++){
                if(this.props.localCartProducts[i].productId === objectsToErase[k]){
                  this.props.localCartProducts.splice(i, 1)
                  
                }
              }
            }

            if(data.length !== null){
            for(let i = 0; i < data.length; i++){
              dataReduced.push(data[i])
            }
          }

          if(this.props.localCartProducts.length !== null){
            for(let i = 0; i < this.props.localCartProducts.length; i++){
              dataReduced.push(this.props.localCartProducts[i])
            }
          }
            
          if(dataReduced.length !== null){
            for(let i = 0; i < dataReduced.length; i++){
              localStorage.setItem(dataReduced[i].productId, JSON.stringify(dataReduced[i]))
              localStorage.setItem(Date.now(), dataReduced[i].productId)
              for(let i = 0; i < 10000000; i++){}
            }
          }
            

            if(parseInt(localStorage.getItem('count')) > 0){
              this.props.dispatch({
                type: SHOW_MODAL,
                payload: true
              });
    
             //eraseLocalStorageProductKeys();
            // console.log('bio u login: ')
            
    
            }else{
             window.location.replace(localStorage.getItem('lastUrl'))
            }
          })
         

         

          localStorage.setItem('x_py35', this.state.authData.password);
          
        }
        else{
          this.setState({allowCheckIsLogged: true});
        }
        
    });

        
    }
    
    

    render(){
        
        const { isLogged, showModal, loginStatus } = this.props;
        const { allowCheckIsLogged } = this.state;
        
        

        
        
        return(
            
          <div style={{margin:'auto', minHeight:'410px'}}>
            <Container>
              
              {showModal ? <ModalElement mergeCartMod={() => this.mergeCart()} 
              modalTitle='Cart'
              modalLine1='There are items in the guest cart.' 
              modalLine2='Would you like to merge them with your saved items?' 
              input='cart' /> : null}
                
                
                <Col xs={4} >
            <div style={{marginTop: '50px', }}>
                
                <Form>
                
                <Form.Group controlId="formBasicEmail" style={{paddingTop: '40px'}}>
                    <Form.Control type="email" placeholder="e-mail" onChange={this.handleChangeUsername} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{marginTop: '20px'}}>
                <Form.Control type="password" placeholder="password" onChange={this.handleChangePassword}/>
                </Form.Group>
               
                
                </Form>
                

           
            </div>
            <Form.Group controlId="formBasicCheckbox">
              
            <Form.Check type="checkbox" label="Stay signed in" value="true" onChange={this.handleStayLogged}/>
            </Form.Group>
            
            <Button onClick={this.postLogData} 
            style={{marginTop:'5px', marginBottom:'15px'}}>Login</Button>

            <div >
              Don't have an account? <Link to="/register" onClick={this.handleClick} style={{marginLeft:'-16px'}}>Sign up!</Link>
            </div>
            <div style={{marginTop:'8px'}}>
            {allowCheckIsLogged ? isLogged ? window.location.replace(localStorage.getItem('lastUrl')) : 
            <div style={{color: 'red'}}>{loginStatus}</div> : null}
            </div>
            </Col>
            </Container>
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch) {
  return{
    dispatch,
     ...bindActionCreators({ getCartProducts }, dispatch)
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
    showModal: state.posts.showModal,
    sessionExpired: state.posts.sessionExpired

    });

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);