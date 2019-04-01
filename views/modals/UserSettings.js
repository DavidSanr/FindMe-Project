import React, {
  Component
} from 'react';
import {
  Modal, 
  TouchableHighlight,
  View,
  Button,
  Alert
} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import firebase from 'react-native-firebase';

export default class ModalUserSettings extends Component {

  constructor(props){
    super(props);
    this.state = {
    
      list:[],
      userList: [{key:1,name :'david',email :'david.sanchez@hotmail.com',Date:Date.now},{key: 2,name :'luis',email :'test@test.com',Date:Date.now}],
      hearThis : [{key:1,name :'david',email :'david.sanchez@hotmail.com',Date:Date.now},{key: 2,name :'luis',email :'test@test.com',Date:Date.now}],
      visible : null,
      
      
    };
    

  }
  
  

  


renderUserList = () =>{

<Content>
      { this.state.users.map((u) => 
      
      
      {
        return(
         <List>
           <ListItem avatar>
             <Left>
               <Thumbnail source={{ uri: 'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png' }} />
             </Left>
             <Body>
               <Text>{u.email}</Text>
               <Text note>Doing what you like will always keep you happy . .</Text>
             </Body>
             <Right>
               <Text note>3:43 pm</Text>
             </Right>
           </ListItem>
         </List>

        )
       })}
       </Content>

}

renderEmptyUserlist = () =>{

      
        return(
         <List>
           <ListItem avatar>
             <Left>
               <Thumbnail source={{ uri: 'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png' }} />
             </Left>
             <Body>
               <Text>test@test.com </Text>
               <Text note>Santo Domingo</Text>
             </Body>
             <Right>
               <Text note>User Register</Text>
             </Right>
           </ListItem>
         </List>

        
)
      

}


componentWillMount(){
  
  this.getAllUsers();
  
  }

componentDidMount(){


     
      
    
    
    
    }

async getAllUsers() {

  firebase
    .database()
    .ref(`users/`)
    .once("value")
    .then(snapshot => {
      var data = snapshot.toJSON();
      var userList = []
      Object.keys(data).map(i => {
      console.log(data[i])
      userList.push(data[i]);


      })
      this.setState({
        userList: userList
      });
    });


    console.log(this.state.userList)

}

clearList() {
  list = [];
}

close = () => {
  this.clearList();
  this.props.closeModal();
 this.clearList();
  this.props.close();
}

setLocationUser = (userID,date) => {
var ubicacion = this.props.setLocationUser;
firebase.database()
.ref(`location/${userID}`)
.set({
  ubicacion
})
.then(data => {
  //success callback
  debugger
  console.log("data ", data);
})
.catch(error => {
  //error callback
  console.log("error ", error);
});



}

  render() {

    var data  = this.props.userList;

    return (

      

      <Modal
       animationType = "fade"
      transparent = {
        false
      }
      onShow = {
        () => this.getAllUsers
      }
      visible = {
        this.props.visible
      }

      onRequestClose ={() => !this.state.modalVisible()}
    
      > 
       <Content>
          <List>
        
      {/* {this.state.userList != undefined ? this.renderUserList : this.renderEmptyUserlist} */}
      { 
        
        
        this.state.userList.map((e) => {
      
        
      return(
     
          
            <ListItem avatar
            onLongPress={() => this.setLocationUser(e.name,e.Date)}
            
            
            >
              <Left>
                <Thumbnail source={{ uri: 'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png' }} />
              </Left>
              <Body>
                <Text>{e.email}</Text>
                <Text note>Santo Domingo</Text>
              </Body>
              {/* <Right>
                <Text note>{e.name}</Text>
              </Right> */}
            </ListItem>
        
           
          )
        })        
      }
        </List>
      
      </Content>
    <Button
    onPress={() => this.props.closeModal()}
          title="close modal"
          color="#541584"
          accessibilityLabel=""

    />

  

      </Modal>

    );
  }
}