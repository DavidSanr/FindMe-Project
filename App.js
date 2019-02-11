import React from 'react'
import AppNavigator from './AppNavigator'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator,createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation'
// import the different screens


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}