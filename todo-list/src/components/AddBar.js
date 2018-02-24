import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { AddTodo } from '../actions';
import { toDoItemStateChanger } from '../reducers';
import { THEME_COLOR, SCREEN_WIDTH, DISPLAY_TEXT_COLOR } from '../utils/constants';

class AddBarComp extends Component {
  state = {
    text: ''
  };

  add = text => {
    toDoItemStateChanger(AddTodo(text));
  }

  render() {
    const {
      containerStyle,
      searchText,
      searchButton
    } = styles;

    return (
      <View style={containerStyle}>
        <View style={searchText}>
          <TextInput
            style={{ color: DISPLAY_TEXT_COLOR, fontSize: 16, paddingBottom: 5 }}
            placeholder='Add an item...'

            underlineColorAndroid='grey'
            onChangeText={input => this.setState({ text: input })}
            value={this.state.text}
            onSubmitEditing={() => {
              this.add(this.state.text);
              this.setState({ text: '' });
            }}
          />
        </View>

        <Button
          buttonStyle={searchButton}
          title={this.props.displayText}
          onPress={() => {
            this.add(this.state.text);
            this.setState({ text: '' });
          }}
          containerStyle={{ backgroundColor: THEME_COLOR }}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  searchText: {
    marginBottom: 10,
    width: SCREEN_WIDTH * 0.9,
  },
  searchButton: {
    backgroundColor: THEME_COLOR,
    width: SCREEN_WIDTH * 0.5,
    height: 45,
    borderColor: THEME_COLOR,
    borderWidth: 0,
    borderRadius: 5
  }
};

const AddBar = connect(null, null)(AddBarComp);
export default AddBar;
