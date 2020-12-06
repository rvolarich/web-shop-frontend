import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class AddToCartButton extends React.Component{

    render(){
        const { postToCart, count } = this.props;
        
        return(
            <div>
                <Button onClick={postToCart} style={{marginLeft:'20px', marginTop:'100px'}}>Add to cart</Button>
                <Button href="/cart" variant="outline-info" 
                style={{marginLeft:'140px', marginTop:'-65px'}}>To cart <span style={{color: 'black'}}>{count}</span></Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.posts.count
  });

export default connect(mapStateToProps)(AddToCartButton);