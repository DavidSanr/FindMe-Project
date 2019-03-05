import {
    createStackNavigator,
    createAppContainer,
    navigationOptions
  } from 'react-navigation';
import Login from './views/Login'
import SignUp from './views/SingUp'
import MapaVista from './views/MapaVista'
import AdminView from './views/AdminView';



const RootStack = createStackNavigator({
  Home: {
    screen: Login
  },
  Signup: {
    screen: SignUp
  },
  MapaVista:{
    screen: MapaVista,
    navigationOptions: () => ({
			title: ('Mapa Vista'),
      headerVisible: false,
      
    
  }
  ,
  AdminView:{
    screen: AdminView
  }


});




const App = createAppContainer(RootStack);

export default App;