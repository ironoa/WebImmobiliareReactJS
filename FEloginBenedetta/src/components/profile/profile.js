import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Label} from 'react-bootstrap';

const products = [];
function addProducts(quantity) {
    const startId = products.length;
    for (let i = 1; i < quantity; i++) {
      const id = startId + i;
      products.push({
        id: id,
        address: 'Item name ' + id,
        type: 'Bilocale',
        price: 2100 + i
      });
    }
  }
  
addProducts(5);

export default class Profile extends React.Component{ 


   render(){ 

      return( 
      <div style={{marginTop:"100px", minHeight:"70vh", padding:"20px"}}>
          <div>
          <h4>
             Username: <Label> my username </Label>
          </h4>
          <h4>
            Email: <Label> my email </Label>
          </h4>
          <h4>
             My wallet: <Label> 100000 </Label>
          </h4> 
        </div>

        <p style={{color:'blue'}}>My houses:</p> 
        <BootstrapTable data={ products }>
            <TableHeaderColumn dataField='id' width='50' isKey={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='address' width='150'>Address</TableHeaderColumn>
            <TableHeaderColumn dataField='type' width='150'>Type</TableHeaderColumn>
            <TableHeaderColumn dataField='price' width='150'>Price</TableHeaderColumn>
        </BootstrapTable>
        </div>
        ); 
   } 
}