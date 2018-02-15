import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import ToDoListItem from './ToDoListItem.js';
import { ToggleTodo, RemoveTodo } from '../actions';


class ToDoListComp extends Component {
  textDec = item => (item.completed ? 'line-through' : 'none');

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '90%',
        backgroundColor: 'orange',
        marginLeft: '5%'
      }}
    />
  );

  renderHeader = () => (
    <SearchBar placeholder="Type Here..." lightTheme round />
  );

  swipeButton = id => ([{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        this.props.del(id);
      }
    }]);


  render() {
    return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            data={this.props.todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Swipeout
                right={this.swipeButton(item.id)}
                autoClose
                backgroundColor='transparent'
              >
                <ToDoListItem
                  text={item.text}
                  textDec={this.textDec(item)}
                  onLongPress={() => this.props.toggle(item.id)}
                  id={item.id}
                />
              </Swipeout>
            )}
          />
        </List>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  toggle: id => {
    dispatch(ToggleTodo(id));
  },
  del: id => {
    dispatch(RemoveTodo(id));
  }
});


const mapStateToProps = state => ({ todos: state.todos });


const ToDoList = connect(mapStateToProps, mapDispatchToProps)(ToDoListComp);
export default ToDoList;
