import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, AsyncStorage, Platform } from 'react-native'
import { Container, Header, Body, Content, List, Button, ListItem, Left, Right, Thumbnail } from 'native-base';
import Firebase from '../../Config/Firebase/Firebase'
import { Avatar, Badge, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { Logout } from '../../Store/Action/Action'
import { connect } from "react-redux";

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            userData: '',
            markers: []
        }
    }
    static navigationOptions = {
        header: null
    }

    async  componentDidMount() {
        var that = this
        await Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                Firebase.firestore().collection("users").doc(user.uid).get().then(res => {
                    let data = res.data()
                    AsyncStorage.setItem('uid', data.uid);
                    that.setState({
                        userData: data
                    })
                })
            }
        });
        let { markers } = this.state
        await Firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if (this.state.userData.uid !== doc.data().uid) {
                        markers.push(doc.data());
                    }
                    this.setState({
                        markers
                    })
                });
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
                                    <View style={{ flexDirection: 'row', textAlign: 'left', }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("UserDetail", this.state.userData)} >


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
                        <Right>
                            <Button transparent onPress={() => this.props.Logout(this.props.navigation)}>
                                <Icon name='md-log-out' size={20} color='white' />
                            </Button>
                        </Right>
                    </Header>

                </View>
                <Container style={{ marginTop: 40 }}>

                    <Content>
                        <List>

                            {
                                this.state.markers.map((val, ind) => {
                                    return <TouchableOpacity key={ind} >

                                        <ListItem avatar style={{ marginBottom: 10 }} onPress={() => this.props.navigation.navigate("ChatDetail", {profile:val,current:this.state.userData})}>
                                            <Left>

                                                <Avatar
                                                    rounded
                                                    source={{
                                                        uri: val.url,
                                                    }}
                                                    size="medium"
                                                />

                                                <Badge
                                                    textStyle={{ color: 'green' }}
                                                    containerStyle={{ position: 'absolute', top: 19, left: 41 }}
                                                />
                                            </Left>
                                            <Body>
                                                <Text>{val.name}</Text>
                                                <Text note>{val.email}</Text>
                                            </Body>
                                            <Right>
                                                <Text note>3:43 pm</Text>
                                            </Right>
                                        </ListItem>
                                    </TouchableOpacity>




                                })
                            }

                        </List>
                    </Content>
                </Container>

            </SafeAreaView>
        )
    }
}




mapStateToProps = state => {

    return {
        isSigned: state.isSigned
    }

}

mapDispatchToProps = dispatch => {
    return {
        Logout: (path) => dispatch(Logout(path))
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(Chat)