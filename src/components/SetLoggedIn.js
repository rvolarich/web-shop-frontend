import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { IS_LOGGED } from '../actions/types';

class SetLoggedIn extends React.Component{

    constructor (props) {
        super(props);
        }

    componentDidMount(){
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
      }

    render(){
        return(
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged,
    username: state.posts.username
    });

export default connect(mapStateToProps)(SetLoggedIn);