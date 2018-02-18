import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import ToDoListItem from './ToDoListItem.js';
import { ToggleTodo, RemoveTodo } from '../actions';
import { THEME_COLOR_LIGHT } from '../utils/constants';


class ToDoListComp extends Component {
  state = {
    searchTerm: '',
    displayed: []
  }

  componentWillUpdate(nextProps) {
        if (nextProps.todos !== this.props.todos) {
            this.setState({ displayed: nextProps.todos.filter((x) => x.text.toLowerCase().includes(this.state.searchTerm)) });
        }
    }

  textDec = item => (item.completed ? 'line-through' : 'none');


  searchText = (e) => {
    const term = e.toLowerCase();
    this.setState({ searchTerm: term });
    let filtered = [];
    filtered = this.props.todos.filter((x) => x.text.toLowerCase().includes(term));
    this.setState({ displayed: filtered });
  }


  swipeButton = id => ([{
      text: 'Delete',
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      onPress: () => {
        this.props.del(id);
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
            data={(!this.state.searchTerm || this.state.searchTerm === '') ? this.props.todos : this.state.displayed}
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
