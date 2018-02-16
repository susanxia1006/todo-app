import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { List, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import ToDoListItem from './ToDoListItem.js';
import { ToggleTodo, RemoveTodo } from '../actions';


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

  searchText = (e) => {
    const term = e.toLowerCase();
    this.setState({ searchTerm: term });
    let filtered = [];
    filtered = this.props.todos.filter((x) => x.text.toLowerCase().includes(term));
    this.setState({ displayed: filtered });
  }

  renderHeader = () => {
    return (
      <SearchBar
        onChangeText={this.searchText.bind(this)}
        placeholder="Type Here..."
        lightTheme
        round
      />
    );
  }

  swipeButton = id => ([{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        this.props.del(id);
      }
    }]);


  render() {
    //this.setState({ displayed: this.props.todos });

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
