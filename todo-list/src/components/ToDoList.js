import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import ToDoListItem from './ToDoListItem.js';
import { ToggleTodo, RemoveTodo } from '../actions';
import { THEME_COLOR_LIGHT } from '../utils/constants';
import db from '../firebase.js';
import { toDoItemStateChanger } from '../reducers';

class ToDoListComp extends Component {
  state = {
    searchTerm: '',
    displayed: [],
    todos: []
  }

  toggle = id => {
    toDoItemStateChanger(ToggleTodo(id));
  }

  del= id => {
    toDoItemStateChanger(RemoveTodo(id));
  }

  componentWillUpdate(nextProps, nextState) {
        if (nextState.todos !== this.state.todos) {
            this.setState({ displayed: nextState.todos.filter((x) => x.text.toLowerCase().includes(this.state.searchTerm)) });
        }
    }

  //use did mount to make sure all children are mounted and have run their own componentDidMount()
  componentDidMount() {
    db.ref('/items').on('value', (datasnapshot) => {
      const items = [];
      datasnapshot.forEach((child) => {
        items.push({
          id: child.key,
          completed: child.val().completed,
          text: child.val().text
        });
      });
      this.setState({ todos: items });
      db.ref('/completed').set(items.filter((x) => x.completed).length);
      db.ref('/total').set(items.length);
      //DO NOT use this.state.todos but use items instead, because of the issue here:
      //https://stackoverflow.com/questions/37401635/react-js-wait-for-setstate-to-finish-before-triggering-a-function
    });
  }

  textDec = item => (item.completed ? 'line-through' : 'none');


  searchText = (e) => {
    const term = e.toLowerCase();
    this.setState({ searchTerm: term });
    let filtered = [];
    filtered = this.state.todos.filter((x) => x.text.toLowerCase().includes(term));
    this.setState({ displayed: filtered });
  }


  swipeButton = id => ([{
      text: 'Delete',
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      onPress: () => {
        this.del(id);
      }
    }]);

    renderSeparator = () => (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: THEME_COLOR_LIGHT,
          marginLeft: '5%'
        }}
      />
    );

    renderHeader = () => (
      <SearchBar
        onChangeText={this.searchText.bind(this)}
        icon={{ type: 'material', color: 'white', name: 'search' }}
        placeholder="Search here..."
        lightTheme
        round
        clearIcon
        placeholderTextColor='white'
        inputStyle={{ color: 'white', backgroundColor: THEME_COLOR_LIGHT }}
      />
    );


  render() {
    return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            data={(!this.state.searchTerm || this.state.searchTerm === '') ? this.state.todos : this.state.displayed}
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
                  onLongPress={() => this.toggle(item.id)}
                  id={item.id}
                />
              </Swipeout>
            )}
          />
        </List>
    );
  }

}


const ToDoList = connect(null, null)(ToDoListComp);
export default ToDoList;
