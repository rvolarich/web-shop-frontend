import React, { Component } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import { getPhoto } from './Repository2';




class LogIn extends React.Component{

  
   constructor(props){
    super(props)
    console.log("constructor")
    this.state = {
      
    }
   }
    
    
 

  componentDidMount(){
    getPhoto().then((photo) => { 
    if(photo != null){
      console.log("photo is not null");
    }
    
    this.setState({
        s: photo
    });
    })
    console.log("component did mount");
  }
render(){
  return (
    <div>
      <h1>LogIn</h1>
      
      <img src={"data:image/jpg;base64," + this.state.s} style={{width:'50vw'}}></img>
      
      
    </div>
  );
}
}
export default LogIn;