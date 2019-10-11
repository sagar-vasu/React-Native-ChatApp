// import React from 'react';

// export default function App() {
//   return (
//     <Provider store={Store}>
//      <Navbar />
//     </Provider>
//   );
// }


import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Store from './src/Store'
import Navbar from './src/Config/Navigation/Navigation'
import { Provider } from 'react-redux'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={Store}>
        <Navbar />
      </Provider>
    );
  }
}

