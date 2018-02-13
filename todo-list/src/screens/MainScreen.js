import React, { Component } from 'react';
import { StyleSheet, View, Platform, Image } from 'react-native';
import { AddBar } from '../components';
import { STATUS_BAR_HEIGHT } from '../utils/constants';

class MainScreen extends Component {

  static navigationOptions = () => ({
    title: 'To-do List',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: (
      <Image
        source={require('../../res/images/ic_launcher.png')}
        style={styles.imageStyle}
      />

    )

  });
  render() {
    return (
      <View style={styles.container}>
        <AddBar displayText='Add' />

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
  },

  headerTitleStyle: {
    marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0
  },

  imageStyle: {
    marginTop: 20,
    marginLeft: 10,
    width: 40,
    height: 40

  }
});

export default MainScreen;