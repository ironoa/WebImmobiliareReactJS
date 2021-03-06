import React from "react";
import {Carousel} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import HouseImm from './casa.png';
import compon from './compon.png';
import compon1 from './compon1.png';
import {Grid, Row,Col, Thumbnail} from 'react-bootstrap';

export default class CaratteristicHouse extends React.Component{ 
    render(){ 
 
        return( 
        <div style={{marginTop:"20px", marginBotton:"20px", minHeight:"75vh", padding:"20px"}}>    
            <div style={{float:'left', marginLeft:"50 px"}}>
            <img src={HouseImm}  className="logo-immage" style={{float:'left', marginLeft: '20px', marginRight:'20px'}} className='logo-immage'/>
            <h4>
              Address: <Label> via Sismondi, 7 </Label>
            </h4>
            <h4>
              City: <Label> Milano </Label>
            </h4>
            <h4>
              Type: <Label> Loft </Label>
            </h4>
            <h4>
              E_Class: <Label> C </Label>
            </h4> 
            <h4>
              Price: <Label> 100.000 </Label>
            </h4>
            </div>

            <div style={{float:'left', marginLeft:'50px'}}>
            <Carousel>
            <Carousel.Item>
            <img width={530} height={200} src={compon}/>
            </Carousel.Item>
             <Carousel.Item>
            <img width={530} height={200} src={compon1} />
            </Carousel.Item>
            </Carousel>
            </div>
            
             <div style={{float:'left', marginLeft:'50px'}}>
              <p>DESCRIZIONE:</p>
              
             </div>
        </div>


        );
    }
}