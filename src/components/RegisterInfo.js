import React from 'react';
import { connect } from 'react-redux';

class RegisterInfo extends React.Component{

    render(){
        
        
        return(
            <div style={{margin:'auto', width:'67%', height:'200px', textAlign:'center'}}>
                <h4 style={{paddingTop:'50px'}}>Thank you for registering with OneStop-ShipShop</h4>
                <br />
                <p>An email has been sent to  <span style={{color:'green'}}>{localStorage.getItem('email')}</span>!</p>
                <p>Please click the link in the email to activate your account.</p>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    email: state.posts.email
    });

export default connect(mapStateToProps)(RegisterInfo);