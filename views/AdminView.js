import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import firebase from 'react-native-firebase';
import {withNavigation} from 'react-navigation'
class AdminView extends Component {

  constructor(props){
    super(props);

    this.state = {
      usersList : null,
      currentUser : null,
      setRegion : null





    }


    var users = null;

  }




getAllUser() {
firebase
.database()
.ref('users')
.once('value')
.then((snapshot) => {
  this.users = snapshot.toJSON();

}
)


}



  render() {
    return (
      <Container>
        <Header />  
        <Content>
       { users.map((u) => {
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
        })}
        </Content>
      </Container>
    );
  }
}

export default withNavigation(AdminView);