import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Logout extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        
        setTimeout(() => {if(this.props.sessionExpired){

            window.location.replace('http://127.0.0.1:3000/sessionexp')
          }
        }, 30)

    }

    handleClick = () => {
        localStorage.removeItem('x_py35');
        fetch('http://127.0.0.1:8080/logout', {
            credentials: 'include',
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log("logout data: ", data)
        })
        .catch((error) => {
            console.log("error: ", error)
        })
    }

    render(){

        return(

            <div>
                <Container>
                    <h3 style={{marginTop: '20px', marginBottom: '20px'}}>Do you really want to logout?</h3>
                    <Button href="/loggedout" style={{marginRight: '15px'}} onClick={this.handleClick}>Yes</Button>
                    <Button href="/shop" >No</Button>
                </Container>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
      dispatch,
       ...bindActionCreators({ }, dispatch)
  }
  }
  
  const mapStateToProps = state => ({
      sessionExpired: state.posts.sessionExpired
      });
  
  export default connect (mapStateToProps, mapDispatchToProps)(Logout);