import React from 'react';
import 'react-table-6/react-table.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ContinueShopping from './ContinueShopping';

let allowConfirm = new Boolean();
class CartCalculator extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
      allowConfirm = false;
    }

    render(){
        const { cTotal, shipping, totalAmount, confirmOrder, prodStock } = this.props;
        
        return(
   <div className="block-example border border-light">
     <Row>
        <div>
       <h4>Cart overview</h4>
        </div>
     </Row>
     <Row>
        <div>
            <h5>Cart total: {cTotal}</h5>
        </div>
     </Row>
     <Row>
     <div>
       <h5>Shipping: {shipping}</h5>
     </div>
     </Row>
     <Row>
     <div>
       <h5>Total with shipping: {totalAmount}</h5>
     </div>
     </Row>
     <Row>
     <div>
              <ContinueShopping />
              {allowConfirm === false ? <Button href="/confirm" variant="outline-info" onClick={() => {confirmOrder()}}
              style={{marginTop:'40px', marginBottom:'20px'}}>Confirm order</Button> : <Button href="/confirm" variant="outline-info" onClick={() => {confirmOrder()}}
              style={{marginTop:'40px', marginBottom:'20px'}} disabled>Confirm order</Button>}
     </div>
     
     </Row>
            </div>
        );
    }
}

export default CartCalculator;

export function allowConfirmButton(toggle){
  if(toggle === 1){
  allowConfirm = true;
}else{
  allowConfirm = true;
}
}