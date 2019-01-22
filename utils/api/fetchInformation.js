import firebase, { database } from "react-native-firebase";

config = {
  databaseURL: "https://testproject-75e4d.firebaseio.com/",
  projectId: "testproject-75e4d",
  apiKey:"AIzaSyBXGRqhPagGIcYgDd4mULMmWLCTy4gVeww",
  appId:"1:198353341777:android:4826b5f1605893f1",
  messagingSenderId: "1:198353341777:android:4826b5f1605893f1",
  storageBucket: "1:198353341777:android:4826b5f1605893f1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}



export function setLocation(region){

    
        firebase.database().ref('location/').set({
            region
            
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    

}

export function fetchLocation(){



}



