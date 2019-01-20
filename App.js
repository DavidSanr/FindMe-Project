/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, GeoOptions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {calculateDistance} from './utils/mapUtilis';
// import modalUserSettings from './modals/UserSettings'


export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      fetchingPosition: false,      
      error: undefined,
      location: null,
      coordinate:{latitude: 30.43301152,longitude: -68.43301152},
      endLatitude:18.43314801,
      endLongitude:-69.97395073
    }

  }

  async _checkPermissionGps() {
    if (Platform.OS !== 'android') {
        return Promise.resolve(true);
    }
    const rationale = {
        title: 'Permiso GPS',
        message: 'Necesitas permitir acceder a tu GPS para obtener tu ubicacion.', 
    };
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, rationale)
        .then((result) => {
            console.log('Permission result:', result);
            return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
}

  
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
      this.setState({
        coordinate : {latitude:position.coords.latitude,longitude:position.coords.longitude}

      })
        var positionA = {coordinate : {latitude:position.coords.latitude,longitude:position.coords.longitude}};
        var positionB = {coordinate:{latitude:this.state.endLatitude,longitude:this.state.endLongitude}};
        var result = calculateDistance(positionA,positionB);
        if(result <= 10){
          Alert.alert("Llegaste","Estas en el punto acordado");

        }
        
        if (result > 10) {

          Alert.alert("No estas...", "No te encuentras en la Ubicacion Acordada");
        };
        

        },


      
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );



  }



   componentDidUpdate(prevProps,prevState) {

    if(!equal(this.state.coordinate, prevState.state.coordinate)) //   
    {
         render();
    }    

   }

  render() {

    return (

      <React.Fragment>
      
        <MapView provider={PROVIDER_GOOGLE} style={styles.container}
          initialRegion={{
            latitude: this.state.coordinate.latitude,
            longitude: this.state.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421

          }}
        ></MapView>

        <Button
          onPress={this.findCoordinates}
          title="Check Location"
          color="#841584"
          accessibilityLabel=""
        />


      </React.Fragment>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})