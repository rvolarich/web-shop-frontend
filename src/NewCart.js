
import React, {Component} from 'react';
import './App.css'
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import './Cart.css';
import ReactDOM from 'react-dom';






class NewCart extends React.Component{

    clickMe = () => {
        
/*        // Get the last <li> element ("Milk") of <ul> with id="myList2"
const itm = document.getElementById("table1").lastChild;

// Copy the <li> element and its child nodes
const cln = itm.cloneNode(true);

// Append the cloned <li> element to <ul> with id="myList1"
document.getElementById("table1").appendChild(cln);*/
const props = {

  name: "Tequila"
}

const  el =  (
  <tr id='tr1'>
                      <td className="col-md-6">
                        <div className="media">
                          <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: '72px', height: '72px'}} /> </a>
                          <div className="media-body">
                            <h4 className="media-heading">{props.name}</h4>
                            
                          </div>
                        </div></td>
                      <td className="col-md-1" style={{textAlign: 'center'}}>
                        <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={2} />
                      </td>
                      <td className="col-md-1 text-center"><strong>$4.99</strong></td>
                      <td className="col-md-1 text-center"><strong>$9.98</strong></td>
                      <td className="col-md-1">
                        <button type="button" className="btn btn-danger">
                          <span className="glyphicon glyphicon-remove" /> Remove
                        </button></td>
                    </tr>
);
/*const itm = React.createElement('tr', null, React.createElement('td', {className:"col-sm-8 col-md-6"},
      React.createElement("div", {className:"media"},
        React.createElement("button", {name: "hello"}, null))))
        const cln = itm.cloneNode(true);
        document.getElementById("table1").appendChild(cln);
      }*/
      //let itm = el('button', null, "NewButton");
      const rowEl = document.createElement('tr');
      rowEl.innerHTML = 'el';
      document.getElementById("bodyt").appendChild(rowEl);
    }

    
    render() {
      
      return (
        <div>
          <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
          <link rel="stylesheet" type="text/css" href="./App.css" />
          {/*---- Include the above in your HEAD tag --------*/}
          <div className="container" style={{marginTop: "100px"}}>
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Total</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  
                  <tbody >
                  <div id="bodyt">
                    <tr>
                      <td className="col-sm-8 col-md-6">
                        <div className="media">
                         
                          <div className="media-body">
                            
                            <span>Status: </span><span className="text-success"><strong>In Stock</strong></span>
                          </div>
                          <div className="media-body">
                            
                            <span>Status: </span><span className="text-success"><strong>In Stock</strong></span>
                          </div>
                          
                        </div></td>
                      <td className="col-sm-1 col-md-1" style={{textAlign: 'center'}}>
                        <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={3} />
                      </td>
                      <td className="col-sm-1 col-md-1 text-center"><strong>$4.87</strong></td>
                      <td className="col-sm-1 col-md-1 text-center"><strong>$14.61</strong></td>
                      <td className="col-sm-1 col-md-1">
                        <button onClick={this.clickMe}>
                           Remove
                        </button></td>
                    </tr>
                    <tr id='tr1'>
                      <td className="col-md-6">
                        <div className="media">
                          <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: '72px', height: '72px'}} /> </a>
                          <div className="media-body">
                            <h4 className="media-heading">Kuhača</h4>
                            
                          </div>
                        </div></td>
                      <td className="col-md-1" style={{textAlign: 'center'}}>
                        <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={2} />
                      </td>
                      <td className="col-md-1 text-center"><strong>$4.99</strong></td>
                      <td className="col-md-1 text-center"><strong>$9.98</strong></td>
                      <td className="col-md-1">
                        <button type="button" className="btn btn-danger">
                          <span className="glyphicon glyphicon-remove" /> Remove
                        </button></td>
                    </tr>
                    <tr>
                      <td className="col-md-6">
                        <div className="media">
                          <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: '72px', height: '72px'}} /> </a>
                          <div className="media-body">
                            <h4 className="media-heading"><a href="#">Product name</a></h4>
                            <h5 className="media-heading"> by <a href="#">Brand name</a></h5>
                            <span>Status: </span><span className="text-warning"><strong>Leaves warehouse in 2 - 3 weeks</strong></span>
                          </div>
                        </div></td>
                      <td className="col-md-1" style={{textAlign: 'center'}}>
                        <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={2} />
                      </td>
                      <td className="col-md-1 text-center"><strong>$4.99</strong></td>
                      <td className="col-md-1 text-center"><strong>$9.98</strong></td>
                      <td className="col-md-1">
                        <button type="button" className="btn btn-danger">
                          <span className="glyphicon glyphicon-remove" /> Remove
                        </button></td>
                    </tr>
                    </div>
                    <tr>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td><h5>Subtotal</h5></td>
                      <td className="text-right"><h5><strong>$24.59</strong></h5></td>
                    </tr>
                    <tr>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td><h5>Estimated shipping</h5></td>
                      <td className="text-right"><h5><strong>$6.94</strong></h5></td>
                    </tr>
                    <tr>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td><h3>Total</h3></td>
                      <td className="text-right"><h3><strong>$31.53</strong></h3></td>
                    </tr>
                    <tr>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td> &nbsp; </td>
                      <td>
                        <button type="button" className="btn btn-default">
                          <span className="glyphicon glyphicon-shopping-cart" /> Continue Shopping
                        </button></td>
                      <td>
                        <button type="button" className="btn btn-success">
                          Checkout <span className="glyphicon glyphicon-play" />
                        </button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  export default NewCart;