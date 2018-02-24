import React, { Component } from 'react';
import { StyleSheet, View, Platform, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { AddBar, ToDoList, StatsModal } from '../components';
import { STATUS_BAR_HEIGHT, THEME_COLOR } from '../utils/constants';

class MainScreen extends Component {

  static navigationOptions = () => ({
    title: 'To-do List',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: (
      <Image
        source={require('../../res/images/web_hi_res_512.png')}
        style={styles.imageStyle}
      />

    ),

  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Button
        title='Login In'
        onPress={() =>
          navigate('Login')
        }
      />
        <ScrollView>
          <View containerStyle={{ height: 100, paddingBottm: 1 }}>
           <AddBar displayText='Add' />
          </View>
          <ToDoList />
        </ScrollView>
        <StatsModal />

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
    backgroundColor: THEME_COLOR
  },

  headerTitleStyle: {
    marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
    color: 'white'
  },

  imageStyle: {
    marginTop: 20,
    marginLeft: 10,
    width: 40,
    height: 40

  }
});

export default MainScreen;
