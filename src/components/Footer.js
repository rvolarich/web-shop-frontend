import React from 'react';
import ReactDelayRender from 'react-delay-render';

class Footer extends React.Component{

render(){
    return(
        <div style={{margin:'auto', width:'100%', height:'300px', textAlign:'center', backgroundColor:'gray'}}>
        <h4 style={{paddingTop:'100px'}}>OneStop-ShipShop</h4>
        </div>
    )
}
    
}

export default ReactDelayRender({ delay: 250 })(Footer);