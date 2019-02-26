import React, {
  Component
} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert
} from 'react-native';
import firebase from "react-native-firebase";

class ModalUserSettings extends Modal {
  state = {
    modalVisible: false,
  };

  



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
      visible: false,
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
      onRequestClose = {
        this.onRequestClose
      }

      >




      </Modal>

    );
  }
}