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
      modalVisible: this.props.visible,
      list:[],
      userList: null,
      
    };
    

    
    
  }
  
  setUsers(users){
    
    this.setState({
      userList : users


    })
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


<Content>
      
        return(
         <List>
           <ListItem avatar>
             <Left>
               <Thumbnail source={{ uri: 'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png' }} />
             </Left>
             <Body>
               <Text>NO USER</Text>
               <Text note>Doing what you like will always keep you happy . .</Text>
             </Body>
             <Right>
               <Text note>3:43 pm</Text>
             </Right>
           </ListItem>
         </List>

        )
       
       </Content>

}


componentWillMount(){
  
  
  
  }

componentDidMount(){

this.getAllUsers();
     
      
    
    
    
    }

async getAllUsers() {

  firebase
    .database()
    .ref(`users/`)
    .once("value")
    .then(snapshot => {
      var userList = snapshot.toJSON();
      console.log(regionValue.coordinate);
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
   this.setState({
    visible: false,
    loadingFields: true
  });
 this.clearList();
  this.props.close();
}

  render() {
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
    {this.state.userList != undefined ? this.renderUserList : this.renderEmptyUserlist}
       </Content>
    <Button
    onPress={() => this.close}
          title="close modal"
          color="#541584"
          accessibilityLabel=""

    />

  

      </Modal>

    );
  }
}