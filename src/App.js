import React, { Component } from 'react';
import './App.css';
import Navig from './Navig';
import SignUp from './SignUp';
import LogIn from './LogIn';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Inventory from './Inventory';
import { Provider } from 'react-redux';

import Cart from './Cart';
import { Button } from 'react-bootstrap';
import store from './store';
import Shop from './Shop';
import ShopItemSelected from './ShopItemSelected';



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

/*constructor(props){
  super(props);
  this.state = {
    count: 0
  }
  this.updateCount = this.updateCount.bind(this);
  
}

 clickMe = () => {
  //this.setState({count:'1'});
  //updateCount();
}

updateCount(){
  console.log("bin in updatecount");
  
  this.setState({count: x});
  
}*/

componentDidMount(){
  console.log('been in app');
}
  
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
      <Route path="/photo" component={LogIn} />
     
      
     

      
        
        <h2>Ovo je x: {x}</h2>
      
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


