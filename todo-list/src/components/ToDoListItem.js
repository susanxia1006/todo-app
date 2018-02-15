import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';


const ToDoListItemComp = ({ text, textDec, onLongPress }) => (
    <ListItem
      containerStyle={{ borderBottomWidth: 0 }}
      title={
        <TouchableHighlight onLongPress={onLongPress}>

          <Text style={{ textDecorationLine: textDec }}>{text}</Text>
        </TouchableHighlight>}
    />
  );


const ToDoListItem = connect()(ToDoListItemComp);
export default ToDoListItem;
