import React from 'react';
import {Map} from './components/Map';
import {Marker} from './components/Marker';
import {InfoWindow} from './components/InfoWindow';
import { GoogleApiWrapper } from 'google-maps-react';
import HouseService from "../../services/houseService/HouseService";
import InitialSearchPage from "../InitialSearchPage/InitialSearchPage";
//import {LocationSearchInput} from './LocationSearchInput';
import {Button} from "../../components/Button/Button";
import Filter from "./components/FilterComponent"
import CitySearchComponent from "./components/CitySearchComponent";

export class MapPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            houseList: JSON.parse(localStorage.getItem("houseList")),
            infoHouse: {},

            city: '',
            minPrice: '',
            maxPrice: '',
            minArea: '',
            maxArea: '',
            type: '',
            E_class: ''

        };
        this.houseService = new HouseService();
    }

    onMapClick = () =>
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });

    onSubmit(event){
        event.preventDefault();
    }

    onMarkerClick (props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,

            showingInfoWindow: true
        });

        /*
        per render di Spec Page
         */
        localStorage.setItem("specIdHouse",props.house.id.toString());
        localStorage.setItem("specPlaceName",props.name.toString());
        localStorage.setItem("specPrice",props.priceTag.toString());
        localStorage.setItem("specArea",props.area.toString());
        localStorage.setItem("specEclass",props.eClass.toString());
        localStorage.setItem("specType",props.type.toString());



    }

    onInfoWindowClose () {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
        // console.log("chiusura");
        // this.props.history.push("/");
        // this.onInfoWindowClick();
    }



    changeCity(event){
        this.setState({city:event.target.value});
        console.log(this.state.city);
    };

    getHouses(){
        /*let city = this.state.city;
        let callback = (results) => {
            let houseResp = results.data.response;
            this.setState({houseList: houseResp});
            console.log(this.state.houseList);
            console.log("Siamo nella callback");
        };
        let callbackError = (error) => {
            localStorage.setItem("loginMessage", "Non sei loggato. Loggati!");
            this.props.history.push("/");
        };
        console.log("inizializazione richiesta");
        this.houseService.getHousesByCityName(city, callback.bind(this), callbackError.bind(this));*/



        /*
        PEZZA delle 2 di notte
         */
        localStorage.setItem("currentCity",this.state.city);
        localStorage.setItem("requestType","searchByCityName");
        this.props.history.push("/initialSearch");


    };

    /*
    ALESSIO:
    handler che verrà passato al componente filtro.
    Avrà i local storage settati adeguatamente, ed avverrà
    un indirizzamento
     */
    searchByFilter(){
        // console.log("ALESSIO: search by filter");
        this.props.history.push("/initialSearch");
    }

    /*
    By Gian
     */
    searchByMap() {
        this.props.history.push("/initialSearch");
    }


    /*
    funzione di prova da BUTTARE VIA!
     */
    getHousesByMaxPrice(){
        localStorage.setItem("maxPrice","130000");
        this.props.history.push("/initialSearch");
    }

    onInfoWindowClick () {
        console.log("Ciao Windows clisckckackaskd");
        this.props.history.push("/");

        // this.props.history.push(variable);
    };


    /*
    callback per il filtro
     */
    setFilterParams(params){
        this.setState({
            city: params.city,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            minArea: params.minArea,
            maxArea: params.maxArea,
            type: params.type,
            E_class: params.E_class
        })
    }

    render() {
        const style = {
            width: '100vw',
            height: '120vh'
        }


        const pos = {lat: 25.783318, lng: -80.134017} //i.e. Miami Beach

        // const pos2 = {lat: (this.state.houseList[5].latitude), lng: (this.state.houseList[5].longitude)};
        //console.log(pos2);

        let markers = [];


        /*
        GIANMARCO: I must write down the markers in the return for the Container rendering, in order to let them be seen on map.
        That's a strange behaviour since I must be able to retrieve that from Axios and then create a Marker.
         {this.state.houseList.map(house => <Marker onClick={this.onMarkerClick} name={''} position={} />)}*/

        let filter = <Filter handlerFather={this.setFilterParams.bind(this)}/>;

        return (


            <div style={style}>

            <div className="col-sm-6">

                <CitySearchComponent history={this.props.history} />

                <Filter/>

            </div>


                <div className="col-sm-6">
                    <Map google={this.props.google} houseList={this.state.houseList} onClick={this.onMapClick} handler={this.searchByMap.bind(this)} >

                        {this.state.houseList.map(house => <Marker onClick={this.onMarkerClick.bind(this)}
                                                                   house={house}
                                                                   name={house.address}
                                                                   priceTag={house.price}
                                                                   position={{lat: house.latitude, lng: house.longitude}}
                                                                   area={house.area}
                                                                   eClass={house.e_class}
                                                                   type={house.type}

                        />)}
                        {/*<Marker position={{lat: this.state.houseList[0].latitude, lng: this.state.houseList[0].longitude}}/>
                        <Marker/>
                        <Marker/>*/}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onInfoWindowClose.bind(this)}
                            placeName={this.state.selectedPlace.name}
                            placePrice={this.state.selectedPlace.priceTag}
                            placeArea={this.state.selectedPlace.area}
                            placeEclass={this.state.selectedPlace.eClass}
                            placeType={this.state.selectedPlace.type}
                            handlerBottone={this.onInfoWindowClick.bind(this)}
                        >
                            <Button title={"Bottone"} customOnClick={this.onInfoWindowClick.bind(this)}/>
                        </InfoWindow>

                        {/*<button
                            className = "btn btn-primary pull-right"
                            onDoubleClick={ this.props.handlerButton  }
                        >
                            View details
                        </button>*/}



                    </Map>
                </div>



            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAeZarnT-wYAMc6IZpwls-P6Cf90H_SVRk"
})(MapPage)