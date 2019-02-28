import React, {
  Component
} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Button,
  Alert
} from 'react-native';
import firebase from "react-native-firebase";

export default class ModalUserSettings extends Component {
  state = {
    modalVisible: false,
    list:[]
  };

  
componentDidMount(){

this.getAllUsers();
 
  



}

async getAllUsers() {

  firebase
    .database()
    .ref(`users/`)
    .once("value")
    .then(snapshot => {
      var userList = snapshot.val();
      console.log(regionValue.coordinate);
      this.setState({
        userList: this.userList
      });
    });

}

clearList() {
  list = [];
}

async close() {
  this.clearList();
  await this.setState({
    modalVisible: false,
    loadingFields: true
  });
  await this.clearList();
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
    <Button
    onPress={() => this.close()}
          title="close modal"
          color="#541584"
          accessibilityLabel=""

          >s

    </Button>

      <View>
      <Text>

        Hey Modal if open
      </Text>


      </View>

      </Modal>

    );
  }
}