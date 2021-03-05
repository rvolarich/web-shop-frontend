import React, { Component } from 'react';
import './App.css';
import Navig from './Navig';
import SignUp from './components/SignUp';
import LogIn from './LogIn';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Inventory from './components/Inventory';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import Cart from './Cart';
import { Button, Container, Row } from 'react-bootstrap';
import store from './store';
import Shop from './Shop';
import ShopItemSelected from './ShopItemSelected';
import Confirm from './components/Confirm';
import axios from 'axios';
import Logout from './components/Logout';
import { IS_LOGGED } from './actions/types';
import SetLoggedIn from './components/SetLoggedIn';
import Register from './components/Register';
import LoggedOut from './components/LoggedOut';
import MyProfile from './components/MyProfile';





var x = 0;

class App extends React.Component{

constructor(props){
  super(props);
  this.state = {
    loggedInStatus: "NOT_LOGGED_IN",
    
   }
  
  
  this.updateCount = this.updateCount.bind(this);
  //this.handleCookie = this.handleCookie(this);
  
}

 clickMe = () => {
  
}

updateCount(){
  console.log("bin in updatecount");
  
  this.setState({count: x});
  
}
/*checkLoginStatus(){
  axios.get("http://127.0.0.1:8080/logged_in", { withCredentials: true })
  .then(response => {
    console.log("logged_in = " + response.data) 
    this.props.dispatch({
      type: IS_LOGGED,
      payload: response.data
  });
  })
  .catch(error => {
    console.log("check login error", error);
  });
}*/

componentDidMount(){
  
  //localStorage.setItem("count", 0);
  /*axios.post('http://127.0.0.1:8080/login', { withCredentials: true},
   {
     username: 'mila'
   }).then(function(response){
     console.log(response);
   })*/
   
}

/*handleCookie = () => {
  axios.post('http://127.0.0.1:8080/login', { withCredentials: true},
   {
     username: 'mila'
   }).then(function(response){
     console.log(response);
   })
   console.log("all ok super");
 }*/

  
render(){

  
  
  return (
   <Provider store={store}>
    <Router>
       
    <Container>
    <Row style={{minHeight:'100px', background:'grey', alignContent:'center'}}>
    <h1 style={{color:'white', marginLeft:'30px'}}>Webshop</h1>
    </Row>
     
    <Navig />
    <SetLoggedIn />
    
    
      <Route path="/shop" component={Shop} />
      <Route path="/inv" component={Inventory} />
      <Route path="/cart" component={Cart} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/confirm" component={Confirm} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/loggedout" component={LoggedOut} />
      <Route path="/profile" component={MyProfile} />
      
     
    </Container>
    
    </Router>
    </Provider>
  );
}
}



//ReactDOM.render(<App />, document.getElementById('root'));
export default App;

export function cartChildren(child){
  x = child;
  console.log("been in ex: " + x);
  
}

/*function ComponentList(){
 return courses.map(function(course){
    return (<div key={course.id}>
      <span>| This is title: {course.owner}</span><br/>

      <span>{course.title}</span>
     </div>
       )

    })

}*/


