import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
import Login from './views/Login'
import SignUp from './views/SingUp'

const RootStack = createStackNavigator({
  Home: {
    screen: Login
  },
  Signup: {
    screen: SignUp
  }
});

const App = createAppContainer(RootStack);

export default App;