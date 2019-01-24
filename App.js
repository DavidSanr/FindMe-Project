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
import { calculateDistance } from "./utils/mapUtilis";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import { setLocation } from "./utils/api/fetchInformation";
import firebase, { Firebase } from "react-native-firebase";
// import modalUserSettings from './modals/UserSettings'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingPosition: false,
      error: undefined,
      location: null,
      region: null,
      endCoordinate: { endLatitude: 18.43314801, endLongitude: -69.97395073 },
      setRegion : {}

    };

    
  }

  componentDidMount() {


    this.setState({

      region: {
        longitude: -69.95420197024941, latitude: 18.437380919762777, latitudeDelta: 0.00041889339744471954,
        longitudeDelta: 0.00034030526876449585
      }
    });

    var config = {
      apiKey: "AIzaSyBXGRqhPagGIcYgDd4mULMmWLCTy4gVeww",
      authDomain: "testproject-75e4d.firebaseapp.com",
      databaseURL: "https://testproject-75e4d.firebaseio.com",
      projectId: "testproject-75e4d",
      storageBucket: "testproject-75e4d.appspot.com",
      messagingSenderId: "198353341777",
      appId: "1:198353341777:android:4826b5f1605893f1"
    };

    // if (!firebase.app.length) {
    //   firebase.initializeApp(config,'testApp');
    // }
    firebase.initializeApp(config, 'testApp');

    // var data = firebase.app("testApp")
    //   .database()
    //   .ref('location/')
    //   .then(snapshot => {
    //     snapshot.val()



    //   });


    






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
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  };

  onRegionChange(region) {
    this.setState({ region });
  };

 
  setLocation(data){


    var setRegion = data.nativeEvent;


   firebase.app("testApp")
      .database()
      .ref("location/")
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


  };

  findCoordinates = () => {
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
            latitude: this.state.endCoordinate.endLatitude,
            longitude: this.state.endCoordinate.endLongitude
          }
        };
        var result = calculateDistance(positionA, positionB);
        if (result <= 10) {
          Alert.alert("Llegaste", "Estas en el punto acordado");
        }

        if (result > 10) {
          Alert.alert(
            "No estas...",
            "No te encuentras en la Ubicacion Acordada"
          );
        }
      },

      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  alDelta(lat, long, accuracy) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
    return (Region = { lat, long, latDelta, longDelta });
  }
  render() {
    return (
      <React.Fragment>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation={true}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          showsMyLocationButton= {true}
          onLongPress= { this.setLocation.bind(this)}
        >
          <Circle
            center={{
              latitude: this.state.endCoordinate.endLatitude,
              longitude: this.state.endCoordinate.endLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            radius={10}
          />
        </MapView>

        <Button
          onPress={this.findCoordinates}
          title="Check Location"
          color="#841584"
          accessibilityLabel=""
        />

        <Button
          onPress={this.setLocation.bind(this)}
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
