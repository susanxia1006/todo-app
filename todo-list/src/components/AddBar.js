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
      containerStyle,
      searchText,
      searchButton
    } = styles;

    return (
      <View style={containerStyle}>
        <TextInput
          style={searchText}
          underlineColorAndroid='grey'
          onChangeText={input => this.setState({ text: input })}
          value={this.state.text}
          onSubmitEditing={() => {
            this.props.add(this.state.text);
            this.setState({ text: '' });
          }}
        />

        <Button
          buttonStyle={searchButton}
          title={this.props.displayText}
          onPress={() => {
            this.props.add(this.state.text);
            this.setState({ text: '' });
          }}

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
  containerStyle: {
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

// const styles = {
//   containerStyle: {
//     marginTop: 75,
//     marginLeft: 10,
//     marginRight: 10,
//     //width: 400,
//     flexDirection: 'row',
//     alignSelf: 'center'
//   },
//   searchTextStyle: {
//     flex: 1
//   },
//   buttonStyle: {
//     height: 30,
//     marginBottom: 8
//   }
// };

const AddBar = connect(null, mapDispatchToProps)(AddBarComp);
export default AddBar;
