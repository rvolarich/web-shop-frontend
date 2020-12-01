import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

class CartItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {quantity: 1, number: 1};

        this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
      const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           this.setState({number: event.target.value})
        }
    }
      
    handleSubmit(event) {
      console.log(this.state);
      event.preventDefault();
    }

    render(){

        const {product} = this.props;
        return (

            <Container>
              
                <Row id={"cartChild"}>
                  <Col>
                  <img src={"data:image/jpg;base64," + product.productImage} style={{width:'9vw',
                             marginLeft: '50px', marginBottom: 'auto' }} alt=""></img>
                  </Col>
                  <Col>
                  <h6 style={{marginTop: '50px'}}>{product.productName}</h6>
                  <h8>{product.productDescription}</h8>
                  <br />
                  <h10><span style={{color: 'green'}}>In Stock:</span> {product.productQuantity} pieces</h10>
                  </Col>
                  <Col style={{marginTop: '50px'}}>
                  <form onSubmit={this.handleSubmit}>
          <input key="index"
              type="number"
              value={this.state.number} 
              onChange={this.handleChange} />
          
        </form>
        <h8 color="grey">Enter quantity</h8>
        
                  </Col>
                  <Col>
                  <Button variant="outline-danger" onClick={this.clickMe} 
                  style={{marginLeft:'100px', marginTop:'35px'}}>Remove</Button>
                  
              <h6 style={{marginTop:'50px', marginLeft: '100px', marginBottom: 'auto'}}>EUR {product.productPrice}</h6>
                
                  </Col>
                </Row>
                <hr />
            </Container>






            /*<tr id='tr1'>
            <td className="col-md-6">
              <div className="media">
                <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: '72px', height: '72px'}} /> </a>
                <div className="media-body">
                  <h4 className="media-heading">{product.name}</h4>
                  
                </div>
              </div></td>
            <td className="col-md-1" style={{textAlign: 'center'}}>
              <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={product.quantity} />
            </td>
            <td className="col-md-1 text-center"><strong>{product.price}</strong></td>
            <td className="col-md-1 text-center"><strong>{product.price * product.quantity}</strong></td>
            <td className="col-md-1">
              <button type="button" className="btn btn-danger">
                <span className="glyphicon glyphicon-remove" /> Remove
              </button></td>
          </tr>*/
        )
    }
}
export default CartItem;