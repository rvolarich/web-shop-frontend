import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class Logout extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
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
                    <h2>Do you really want to logout?</h2>
                    <Button onClick={this.handleClick}>Logout</Button>
                </Container>
            </div>
        )
    }
}

export default Logout;