import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import { DISPLAY_TEXT_COLOR } from '../utils/constants';


const ToDoListItemComp = ({ text, textDec, onLongPress }) => (
    <ListItem
      containerStyle={{ borderBottomWidth: 0 }}
      title={
        <TouchableHighlight
          onLongPress={onLongPress}
          underlayColor='rgba(221, 221, 221, 0.5)'
        >

          <Text style={{ color: DISPLAY_TEXT_COLOR, fontSize: 18, textDecorationLine: textDec }}>{text}</Text>
        </TouchableHighlight>}
    />
  );


const ToDoListItem = connect()(ToDoListItemComp);
export default ToDoListItem;
