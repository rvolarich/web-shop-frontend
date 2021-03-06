import React from 'react';
import 'react-table-6/react-table.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ContinueShopping from './ContinueShopping';
import { Link } from 'react-router-dom';

let allowConfirm = new Boolean();
class CartCalculator extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
      allowConfirm = false;
    }

    render(){
        const { cTotal, shipping, totalAmount, confirmOrderKey, prodStock } = this.props;
        
        return(
  <div>
  <div style={{border:'solid 1px', width:'100%', borderRadius:'5px', borderColor:'#5CAEBB', backgroundColor:'#EFFAFC',
     marginTop:'-17px', minHeight:'250px'}}>
     
        
      <h5 style={{paddingLeft:'15px', paddingTop:'25px', color:'gray'}}>Cart overview</h5>
        
     <hr />
      
    <h6 style={{paddingLeft:'15px', color:'gray'}}>Cart total:<span style={{float:'right', paddingRight:'15px', color:'gray'}}> {cTotal.toFixed(2)}</span></h6>
    
    <hr />
     
       <h6 style={{paddingLeft:'15px', color:'gray'}}>Shipping:<span style={{float:'right', paddingRight:'15px', color:'gray'}}> {shipping.toFixed(2)}</span></h6>
     
     
       <hr />
     
       <h5 style={{paddingLeft:'15px', color:'gray'}}>Total:<span style={{float:'right', paddingRight:'15px', color:'gray'}}> {totalAmount}</span></h5>
     
       </div>
    
     <div>
              
              {allowConfirm === false ? <Button   variant="outline-info" 
              onClick={() => this.props.confirmOrderKey()}
              style={{marginTop:'10px', marginBottom:'20px', width:'100%',
               paddingTop:'15px', paddingBottom:'15px'}}>Confirm order</Button> :  <Button variant="outline-info"
               onClick={() => this.props.confirmOrderKey()}
              style={{marginTop:'10px', marginBottom:'20px'}} disabled>Confirm order</Button>}
     </div>
     
     </div>
            
        );
    }
}

function mapDispatchToProps(dispatch) {
  return{
    dispatch,
     ...bindActionCreators({}, dispatch)
}
}

const mapStateToProps = state => ({
    isLogged: state.posts.isLogged
    });

export default connect (mapStateToProps, mapDispatchToProps)(CartCalculator);

export function allowConfirmButton(toggle){
  if(toggle === 1){
  allowConfirm = true;
}else{
  allowConfirm = false;
}
}