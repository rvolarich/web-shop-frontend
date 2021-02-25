import React, { Component } from 'react';
import './App.css';
import Navig from './Navig';
import SignUp from './components/SignUp';
import LogIn from './LogIn';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Inventory from './Inventory';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import Cart from './Cart';
import { Button } from 'react-bootstrap';
import store from './store';
import Shop from './Shop';
import ShopItemSelected from './ShopItemSelected';
import Confirm from './components/Confirm';
import axios from 'axios';



/*const courses = [
{
  id: 1,
  title: "Moj Webshop",
  owner: "Me"
},
}
{
  id: 1,
  title: "Avioprijevoz",
  owner: "You"
},

{
  id: 1,
  title: "sladoled",
  owner: "She"
}

];*/

var x = 0;

class App extends React.Component{

constructor(props){
  super(props);
  this.state = {
    loggedInStatus: "NOT_LOGGED_IN",
    
   }
  
  
  this.updateCount = this.updateCount.bind(this);
  //this.handleCookie = this.handleCookie(this);
  this.checkLoginStatus = this.checkLoginStatus.bind(this)
}

 clickMe = () => {
  //this.setState({count:'1'});
  //updateCount();
}

updateCount(){
  console.log("bin in updatecount");
  
  this.setState({count: x});
  
}
checkLoginStatus(){
  axios.get("http://localhost:8080/logged_in", { withCredentials: true })
  .then(response => {
    console.log("header: " + JSON.stringify(response.data))
  })
  .catch(error => {
    console.log("check login error", error);
  });
}

componentDidMount(){
  
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
       
    <div>
     
    <Navig />
    
    
      <Route path="/shop" component={Shop} />
      <Route path="/inv" component={Inventory} />
      <Route path="/cart" component={Cart} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/confirm" component={Confirm} />
     
    </div>
    
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


