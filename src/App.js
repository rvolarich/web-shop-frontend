import React, { Component } from 'react';
import './App.css';

import Navig from './Navig';
import SignUp from './components/SignUp';
import LogIn from './LogIn';
import {Switch, Route, HashRouter, BrowserRouter, Link} from 'react-router-dom';
import Inventory from './components/Inventory';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import Cart from './Cart';
import { Button, Container, Row } from 'react-bootstrap';
import store from './store';
import Shop from './Shop';

import Confirm from './components/Confirm';
import axios from 'axios';
import Logout from './components/Logout';
import { IS_LOGGED } from './actions/types';
import SetLoggedIn from './components/SetLoggedIn';
import Register from './components/Register';
import LoggedOut from './components/LoggedOut';
import MyProfile from './components/MyProfile';
import CheckCenter from './components/CheckCenter';
import Goodbye from './components/GoodBye';
import Activation from './components/Activation';
import SessionExpired from './components/SessionExpired';
import RegisterInfo from './components/RegisterInfo';
import Footer from './components/Footer';
import ModalInventory from './components/ModalInventory';
import Home from './components/Home';
import ChangePassword from './components/ChangePassword';
import NewPassword from './components/NewPassword';





var x = 0;

class App extends React.Component{

constructor(props){
  super(props);
  this.state = {
    loggedInStatus: "NOT_LOGGED_IN",
    allowExpired: true
   }
  
  
  this.updateCount = this.updateCount.bind(this);
  
  
}

 clickMe = () => {
  
}

updateCount(){
  
  
  this.setState({count: x});
  
}






  
render(){

  
  
  return (
   
    
    <Provider store={store}>
   
  <BrowserRouter>
  <SetLoggedIn />
<div style={{margin:'auto', width:'100%', height:'150px', backgroundColor:'#447297'}}>
    <h1 style={{color:'white', paddingLeft:'17%', paddingTop:'42px'}}>OneStop-ShipShop</h1>
    </div>

<Navig />
  
      <Route path="/" component={Home} exact />
      <Route path="/shop" component={Shop} />
      <Route path="/inv" component={Inventory} />
      <Route path="/cart" component={Cart} />
      <Route path="/profile" component={MyProfile} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/confirm" component={Confirm} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/loggedout" component={LoggedOut} />
      <Route path="/bye" component={Goodbye} />
      <Route path="/activation" component={Activation} />
      <Route path="/sessionexp" component={SessionExpired} />
      <Route path="/reginfo" component={RegisterInfo} />
      <Route path="/log" component={ModalInventory} />
      <Route path="/pass" component={ChangePassword} />
      <Route path="/passhgjgJHGhk76JhjgjhewerRTEiopopijLJKoiiuuitwJH6738" component={NewPassword} />
      
     
    
    
    </BrowserRouter>
    <Footer />
    </Provider>
   
  );
}
}




export default App;

export function cartChildren(child){
  x = child;
  console.log("been in ex: " + x);
  
}



