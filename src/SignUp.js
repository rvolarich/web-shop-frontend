import React from 'react';
import './App.css'
import axios from 'axios';





function SignUp() {

  const axios = require('axios');

  /*axios({
    method: 'options',
    url: 'http://localhost:8080/users/save',
    headers: {'Access-Control-Max-Age': '0'}
  });*/

   /* axios.post('http://localhost:8080/users/save', {
        firstname: 'Fred',
        surname: 'Flintstone'
      })
      .then(function (response) {
          //alert('user saved');
        console.log(response);
      });*/
     
      const data = { 
        firstname: "example",
         surname: "hguzt"         
    
    };

      fetch('http://localhost:8080/users/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  'Access-Control-Max-Age': '0'
  },
  body: JSON.stringify({data}),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
  return (
    <div>
      <h1>SignUp</h1>
       
    </div>
  );
}

export default SignUp;