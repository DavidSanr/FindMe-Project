import firebase from "react-native-firebase";


export default class  testAppDbcontext {
    
    constructor(db)
    {
        this.db = db

    
    }
 


getAllObject(db) {
    var data = null;

    firebase
    .database()
    .ref(db)
    .once('value')
    .then((snapshot) => {
      data = snapshot.toJSON();     
        
      
    })
    .then(data => {
     //success call
     console.log(data)   



    })

    .catch(error => {
        //Error Catch
    console.log(error)


    })
    
    ;
    
return data;
}




getObject(db,id) {
    var data = null;

    firebase
    .database()
    .ref(`${db}/${id}`)
    .once('value')
    
    .then((snapshot) => {
      data = snapshot.toJSON();     
        
      
    })
    .then(data => {
        //success callback
        console.log("data ", data);
      })
    .catch(error => {
        //error callback
        console.log("error ", error);
      });
    
    
return data;
}


pushObjectToDb(db,id,data){
    firebase
    .database()
    .ref(`${db}/${id}`)
    .set({
      data
    })
    .then(data => {
      //success callback
      console.log("data ", data);
    })
    .catch(error => {
      //error callback
      console.log("error ", error);
    });


}

}