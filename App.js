import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator,createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation'
// import the different screens
import Loading from './views/Loading'
import SignUp from './views/SingUp'
import Login from './views/Login'
import MapaVista from './views/MapaVista'

// create our app's navigation stack

const AppStack = createStackNavigator({ Home: MapaVista });
const AuthStack = createStackNavigator({ SignIn: Login,SignUp: SignUp })
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: Loading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
