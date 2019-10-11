import React from 'react'
import { View, Text, Image, SafeAreaView,TouchableOpacity } from 'react-native'

import { Header, Body } from 'native-base';
import Firebase from '../../Config/Firebase/Firebase'
import { Avatar, Badge, } from 'react-native-elements'
class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      userData: ''
    }
  }

  componentDidMount() {
    var that = this
    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        Firebase.firestore().collection("users").doc(user.uid).get().then(res => {
          let data = res.data()
          that.setState({
            userData: data
          })

        })
      }
    });
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginTop: 23 }}>
          <Header style={{ backgroundColor: '#673BB6' }}>
            <Body>
              {

                this.state.userData ?
                  <View style={{ flexDirection: 'row', textAlign: 'left', }}   >
                    <TouchableOpacity  onPress={() =>alert('fhjdhf')} >

                    <Avatar
                        rounded
                        source={{
                          uri: this.state.userData.url,
                        }}
                        size="medium"
                      />
                     </TouchableOpacity>
                        <Badge
                          status="success"
                          containerStyle={{ position: 'absolute', top: -2, left: 34 }}
                        />
                        <Text style={{ color: 'white', alignSelf: "center", marginLeft: 3 }}>{this.state.userData.name}</Text>
                  </View>
                    :
                  <Text>{''}</Text>
                    }
      
      
            </Body>
          </Header>

        </View>
          <View style={{ marginTop: 30 }}>
            <Text>
              I am Discover Page
  
          </Text>
          </View>

      </SafeAreaView>
        )
      }
    }
    
    
    
export default Discover