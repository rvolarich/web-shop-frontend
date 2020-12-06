import React from 'react';
import { Container } from 'react-bootstrap';
import ContinueShopping from './ContinueShopping';

class Confirm extends React.Component{
    render(){
        return(
            <Container>
                <h2>Congrats!</h2>
           <ContinueShopping />
           </Container>
        );
    }
}

export default Confirm;