import {
    createStackNavigator,
    createAppContainer,
    navigationOptions
  } from 'react-navigation';
import Login from './views/Login'
import SignUp from './views/SingUp'
import MapaVista from './views/MapaVista'

const RootStack = createStackNavigator({
  Home: {
    screen: Login
  },
  Signup: {
    screen: SignUp
  },
  MapaVista:{
    screen: MapaVista
    
  }


});

const App = createAppContainer(RootStack);

export default App;