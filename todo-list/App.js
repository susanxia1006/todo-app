import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import MainScreen from './src/screens/MainScreen.js';
import Store from './src/store';

// get rid of the yellobox warning https://github.com/facebook/react-native/issues/12981
console.ignoredYellowBox = [
    'Setting a timer'
];


export default class App extends Component {
  componentwillMount() {
    console.log('app mounted');
    console.log(firebase.database().ref());
  }
  render() {
    const MainNavigator = StackNavigator({
      Main: { screen: MainScreen },

    });


    return (
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    );
  }
}
