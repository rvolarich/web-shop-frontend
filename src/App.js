import React, { Component } from 'react';
import './App.css';
import Navig from './Navig';
import SignUp from './SignUp';
import LogIn from './LogIn';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Inventory from './Inventory';
import Shop from './Shop';
import Cart from './Cart';
import axios from 'axios';
import ReactDOM from 'react-dom';
import NewCart from './NewCart';
import { Button } from 'react-bootstrap';



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



class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
    count: 0
  };

}


 clickMe = () => {
  this.setState({count:1});
  
}


  
render(){
  return (
    <Router>
    <div>
     
    <Navig />
      <Route path="/shop" component={Shop} />
      <Route path="/inv" component={Inventory} />
      <Route path="/cart" component={Cart} />
      <Route path="/signup" component={SignUp} />
      <Route path="/photo" component={LogIn} />
      
     

      <div>
  <Button  onClick={this.clickMe}>I clicked {this.state.count}</Button>
      </div>
        
        
      
    </div>
    </Router>
  );
}
}

//ReactDOM.render(<App />, document.getElementById('root'));
export default App;

/*function ComponentList(){
 return courses.map(function(course){
    return (<div key={course.id}>
      <span>| This is title: {course.owner}</span><br/>

      <span>{course.title}</span>
     </div>
       )

    })

}*/


