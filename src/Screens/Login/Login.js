import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FacebookLogin } from "../../Store/Action/Action";
import Firebase from '../../Config/Firebase/Firebase'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from "react-redux";
import { SafeAreaView, Image } from 'react-native'


class Login extends React.Component {
    static navigationOptions = {
        header: null,

    };

    componentDidMount() {
        var that = this
        Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.props.navigation.navigate('Home')
            }
        });
    }




    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <LinearGradient
                    colors={["#5b247a", "#673BB6"]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "100%",
                    }} >

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 90, height: 90 ,marginBottom:20}}
                        source={require('../../../assets/logo.jpg')}
                    />
                    <Icon.Button
                        name="facebook"
                        backgroundColor="#3b5998"
                        onPress={() => this.props.FacebookLogin(this.props.navigation)}
                        style={{ width: "80%" }}
                    >
                        Login with Facebook
                        </Icon.Button>
                </View>

                </LinearGradient>


            </SafeAreaView >
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
        FacebookLogin: (path) => dispatch(FacebookLogin(path))
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(Login)