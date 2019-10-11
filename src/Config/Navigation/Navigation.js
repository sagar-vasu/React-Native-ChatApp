import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Login, Chat, Discover, ChatDetail, UserDetail } from '../../Screens/index'
import Icon from '@expo/vector-icons/Ionicons';





const ChatStackBar = createStackNavigator({
    Chat: {
        screen: Chat
    },
   
})



const TabNavigator = createBottomTabNavigator({

    Chat: {
        screen: ChatStackBar,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-chatboxes" size={20} color='#673BB6' />
            )
        },

    },
    Discover: {
        screen: Discover,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-compass" size={20} color='#673BB6' />
            )
        },

    }
},
    {
        tabBarOptions: {
            activeTintColor: '#673BB6',
            inactiveTintColor: 'gray',
        },
    }


);

const TabsNavigator = createStackNavigator({
    Dashboard: {
        screen: TabNavigator,
    },
    UserDetail: {
        screen: UserDetail
    },
    ChatDetail:{
        screen:ChatDetail
    }
},
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header: null
            };
        }
    }
)




const AppNavigator = createSwitchNavigator({
    Login: {
        screen: Login,
    },
    Home: {
        screen: TabsNavigator
    }
});




export default createAppContainer(AppNavigator)
