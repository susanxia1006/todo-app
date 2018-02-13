import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen.js';
import Store from './src/store';


export default class App extends Component {
  render() {
    const MainNavigator = StackNavigator({
      Main: { screen: MainScreen }

    });

    return (
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    );
  }
}
