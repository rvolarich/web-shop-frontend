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
  <div>
  <div style={{border:'solid 1px', width:'100%', borderRadius:'15px', 
     marginTop:'-17px', minHeight:'250px'}}>
     
        
      <h5 style={{paddingLeft:'15px', paddingTop:'25px'}}>Cart overview</h5>
        
     <hr />
      
    <h6 style={{paddingLeft:'15px'}}>Cart total:<span style={{float:'right', paddingRight:'15px'}}> {cTotal}</span></h6>
    
    <hr />
     
       <h5 style={{paddingLeft:'15px'}}>Shipping:<span style={{float:'right', paddingRight:'15px'}}> {shipping}</span></h5>
     
     
       <hr />
     
       <h5 style={{paddingLeft:'15px'}}>Total:<span style={{float:'right', paddingRight:'15px'}}> {totalAmount}</span></h5>
     
       </div>
    
     <div>
              
              {allowConfirm === false ? <Button   variant="outline-info" 
              onClick={() => this.props.confirmOrderKey()}
              style={{marginTop:'10px', marginBottom:'20px', marginLeft:'10px',
              paddingLeft:'115px', paddingRight:'115px', paddingTop:'15px', paddingBottom:'15px'}}>Confirm order</Button> : <Button href="/confirm" variant="outline-info" onClick={() => {confirmOrder()}}
              style={{marginTop:'10px', marginBottom:'20px'}} disabled>Confirm order</Button>}
     </div>
     <div><ContinueShopping /></div>
     </div>
            
        );
    }
}

export default CartCalculator;

export function allowConfirmButton(toggle){
  if(toggle === 1){
  allowConfirm = true;
}else{
  allowConfirm = false;
}
}