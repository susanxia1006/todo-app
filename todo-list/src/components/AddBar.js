import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { AddTodo } from '../actions';

class AddBarComp extends Component {
  state = {
    text: ''
  };

  render() {
    const {
      searchContainer,
      searchText,
      searchButton
    } = styles;

    return (
      <View style={searchContainer}>
        <TextInput
          style={searchText}
          onChangeText={input => this.setState({ text: input })}
          value={this.state.text}
          onSubmitEditing={() => this.props.add(this.state.text)}
        />

        <Button
          buttonStyle={searchButton}
          title={this.props.displayText}
          onPress={() => this.props.add(this.state.text)}

        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  add: text => {
    dispatch(AddTodo(text));
  }

});

const styles = {
  searchContainer: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  searchText: {
    marginBottom: 10

  },
  searchButton: {
    width: 100,
    backgroundColor: 'blue',
    alignSelf: 'center'

  }
};

const AddBar = connect(null, mapDispatchToProps)(AddBarComp);
export default AddBar;
