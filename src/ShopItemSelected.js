import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { getProductId } from './Repository2';
import { connect } from 'react-redux';
import Shop from './Shop';
import count from './Shop'
import AddToCartButton from './AddToCartButton';
import Navig from './Navig';
import { cartChildren } from './App'
import { getCartQty } from './actions/postActions';
import { GET_DATA, POST_DATA, GET_CART_QTY, INCREMENT  }  from './actions/types';

class ShopItemSelected extends React.Component{

    render(){
        const { item } = this.props;
        return(
            <Container>
                <Row>
                <h1>Hiiiiiezeuez</h1>
                </Row>
                
            </Container>
        )
    }
}

export default ShopItemSelected;