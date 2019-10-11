import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView, YellowBox } from 'react-native'
import { Header, Body, Left, Button, Container, Content } from 'native-base';
import Firebase from '../../Config/Firebase/Firebase'
import { Avatar, Badge, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

import { GiftedChat } from 'react-native-gifted-chat'
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

class ChatDetail extends React.Component {

    constructor() {
        super()
        this.state = {
            userData: '',
            messages: [],
        }

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    static navigationOptions = {
        header: null
    }

    async  componentDidMount() {

        let userData = this.props.navigation.state.params.profile
        let CureentUser = this.props.navigation.state.params.current

        let { messages } = this.state
        this.setState({
            CureentUser,
            userData
        })
        var that = this
        let check = []
        await Firebase.firestore().collection(`chat-${userData.uid}`).where("ReciverId", "==", CureentUser.uid).where("senderId", "==", userData.uid).get().then(res => {
            res.forEach(doc => {
                let data = doc.data()
                data.chat.createdAt = data.chat.createdAt.toDate()
                data.chat.user = {
                    _id: 2,
                    avatar: data.chat.avatar
                }
                check.push(data.chat)
                messages.push(data.chat)
            })
        })

        await Firebase.firestore().collection(`chat-${CureentUser.uid}`).where("ReciverId", "==", userData.uid).where("senderId", "==", CureentUser.uid).get().then(res1 => {
            res1.forEach(doc1 => {
                let data = doc1.data()
                data.chat.createdAt = data.chat.createdAt.toDate()
                
                
                data.chat.user = {
                    _id: 1,
                    avatar: data.chat.avatar
                }
                check.push(data.chat)
                check.sort(function(a, b){return b.createdAt-a.createdAt});
                messages.push(data.chat)

                that.setState({
                    messages:check
                })

            })
        })





    }
    onSend(messages = []) {
        let { userData, CureentUser } = this.state
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        messages[0].senderId = CureentUser.uid,
            messages[0].ReciverId = userData.uid
        messages[0].avatar = CureentUser.url

        Firebase.firestore().collection(`chat-${CureentUser.uid}`).add({ senderId: CureentUser.uid, ReciverId: userData.uid, chat: messages[0] })

    }
    render() {


        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginTop: 23 }}>
                    <Header style={{ backgroundColor: '#673BB6' }}>
                        <Body>
                            {
                                this.state.userData ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ paddingRight: 10 }}>
                                            <Button transparent onPress={() => this.props.navigation.navigate("Chat")}>
                                                <Icon color="white" size={20} name='md-arrow-back' />
                                            </Button>

                                        </TouchableOpacity>
                                            <Avatar
                                                rounded
                                                source={{
                                                    uri: this.state.userData.url,
                                                }}
                                                size="medium"
                                            />
                                        <Badge
                                            status="success"
                                            containerStyle={{ position: 'absolute', top: -2, left: 34 }}
                                        />
                                        <Text style={{ color: 'white', alignSelf: "center", marginLeft: 3 }}>{this.state.userData.name}</Text>
                                    </View>
                                    :
                                    <TouchableOpacity>
                                        <Button transparent onPress={() => this.props.navigation.navigate("Chat")}>
                                            <Icon color="white" size={20} name='md-arrow-back' />
                                        </Button>

                                    </TouchableOpacity>
                            }


                        </Body>
                    </Header>

                </View>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                        keyboardVerticalOffset={90}

                        enabled
                    >
                        <GiftedChat
                            messages={this.state.messages}
                            isAnimated={true}
                            onSend={messages => this.onSend(messages)}
                            user={{
                                _id: 1,
                            }}
                        />
                    </KeyboardAvoidingView>
                </View>



            </SafeAreaView >
        )
    }
}



export default ChatDetail







