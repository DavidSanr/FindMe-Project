import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  GeoOptions
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { calculateDistance, calDelta } from "../utils/mapUtilis";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import { setLocation } from "../utils/api/fetchInformation";
// import configFirebase from '../firebase'
import firebase from "react-native-firebase";
// import ModalUserSettings from './modals/UserSettings'

export default class MapaVista extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      fetchingPosition: false,
      error: undefined,
      location: null,
      region: {
        longitude: -69.95420197024941,
        latitude: 18.437380919762777,
        latitudeDelta: 0.00041889339744471954,
        longitudeDelta: 0.00034030526876449585
      },
      endCoordinate: null,
      setRegion : null

    };
  }
  
  componentWillMount() {
  
  this.setState({
    region: {
      longitude: -69.95420197024941,
      latitude: 18.437380919762777,
      latitudeDelta: 0.00041889339744471954,
      longitudeDelta: 0.00034030526876449585
    },

    currentUser: firebase.auth().currentUser.uid
  });



    // function setRol(){

    //   firebase
    //   .database('/roles').snapshot
    //   .then( (snapshot) => { snapshot.val.map((e) =>
        
        
        
        
        
    //     ) })

    // };

    let ubicacionConsumida=
    firebase
    .database()
    .ref(`location/${firebase.auth().currentUser.uid}`)
    .once('value')
    .then((snapshot) => {
      ubicacion = snapshot.val();
      
    });
    

    this.setState({

     

      currentUser: firebase.auth().currentUser.uid,
      setRegion : this.ubicacionConsumida

      

    });
  
    // firebase.initializeApp(configFirebase,'testapp')

    
  }

  






  async _checkPermissionGps() {
    if (Platform.OS !== "android") {
      return Promise.resolve(true);
    }
    const rationale = {
      title: "Permiso GPS",
      message: "Necesitas permitir acceder a tu GPS para obtener tu ubicacion."
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      rationale
    ).then(result => {
      console.log("Permission result:", result);
      return result === false || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  setModalVisible() {
    this.setState({
      modalVisible:!this.state.modalVisible
    });
  }

  setLocation(data) {
    var setRegion = data.nativeEvent;

    firebase
      .database()
      .ref(`location/${firebase.auth().currentUser.uid}`)
      .set({
        setRegion
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });

    setRegion = calDelta(
      setRegion.coordinate.latitude,
      setRegion.coordinate.longitude,
      20
    );
    
    this.setState({ setRegion: setRegion });
  }

  findCoordinates = () => {
    debugger
    navigator.geolocation.getCurrentPosition(
      position => {
        // this.setState({
        //     region : {position.coords.latitude,position.coords.longitude}
        // })
        var positionA = {
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        };
        var positionB = {
          coordinate: {
            latitude: this.state.setRegion.latitude,
            longitude: this.state.setRegion.longitude
          }
        };
        var result = calculateDistance(positionA, positionB);
        if (result <= 25) {
          Alert.alert("Llegaste", "Estas en el punto acordado");
        }

        if (result > 25) {
          Alert.alert(
            "No estas...",
            "No te encuentras en la Ubicacion Acordada"
          );
        }
      },

      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 2000 }
    );
  };

  render() {
    return (
      <React.Fragment>
                 
        
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation={true}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          showsMyLocationButton={true}
          onLongPress={e => this.setLocation(e)}
        >
         {/* <MapView.Circle
        center={{
          latitude: this.state.setRegion.latitude,
          longitude: this.state.setRegion.longitude,
        }}
        
        radius={20}
        strokeWidth={2}
        strokeColor="#3399ff"
        fillColor="#80bfff"
      /> */}
        
      

          <MapView.Marker coordinate={this.state.setRegion} />
        </MapView>

        <Button
          onPress={this.findCoordinates}
          title="Check Location"
          color="#841584"
          accessibilityLabel=""
        />

        <Button
          onPress={() => this.props.navigator.navigate('AdminView')}
          title="set Location"
          color="#541584"
          accessibilityLabel=""
        />
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
