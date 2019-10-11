import React from 'react'
import { Text, View } from 'native-base'
import { Header, Left, Body, Right, Title, Button, Icon, Card, CardItem } from 'native-base';
import { SafeAreaView, TouchableOpacity, } from 'react-native'
import { Avatar, Badge, } from 'react-native-elements'

class UserDetail extends React.Component {
    navigationOptions = {
        header: { visible: true },
    }
    render() {
        console.log('i am flll', this.props.navigation.state.params)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginTop: 23 }}>
                    <Header style={{ backgroundColor: '#673BB6' }}>
                        <Left>
                            <TouchableOpacity>
                                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                    <Icon name='arrow-back' />
                                </Button>

                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{ color: 'white' }}>Profile</Title>
                        </Body>
                        <Right />
                    </Header>

                </View>
                <View style={{ marginTop: 30,width:300,alignSelf:'center' }}>
                    <Card>
                        <CardItem header button>
                            <Avatar
                                rounded
                                source={{
                                    uri: this.props.navigation.state.params.url
                                }}
                                size="large"
                            />
                        </CardItem>
                        <CardItem button >
                            <Body>
                                <View>
                                    <Text >
                                        {this.props.navigation.state.params.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text >
                                    {this.props.navigation.state.params.email}
                                    </Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                </View>

            </SafeAreaView>
        )
    }
}

export default UserDetail