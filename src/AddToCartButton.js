import React from 'react';
import { Button } from 'react-bootstrap';


export default class AddToCartButton extends React.Component{

    render(){
        const { postToCart } = this.props;
        
        return(
            <div>
                <Button onClick={postToCart} style={{marginLeft:'100px', marginTop:'90px'}}>Add to cart</Button>
            </div>
        )
    }
}