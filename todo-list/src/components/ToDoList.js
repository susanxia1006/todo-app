import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import ToDoListItem from './ToDoListItem.js';
import { ToggleTodo } from '../actions';


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


  render() {
    return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            data={this.props.todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ToDoListItem
                text={item.text}
                textDec={this.textDec(item)}
                onLongPress={() => this.props.toggle(item.id)}
                id={item.id}
              />
            )}
          />
        </List>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  toggle: id => {
    dispatch(ToggleTodo(id));
  }
});


const mapStateToProps = state => ({ todos: state.todos });


const ToDoList = connect(mapStateToProps, mapDispatchToProps)(ToDoListComp);
export default ToDoList;
