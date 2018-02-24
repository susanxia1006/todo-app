import React, { Component } from 'react';
import { Text, View, Modal, Animated } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { OpenModal, CloseModal } from '../actions';
import db from '../firebase.js';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  THEME_COLOR,
  DISPLAY_TEXT_COLOR,
  MONTHS,
  THEME_COLOR_LIGHT
} from '../utils/constants';

class StatsModalComp extends Component {
  state = {
    total: 0,
    completed: 0
  }
  componentDidMount() {
    // access to firebase are async calls.
    db.ref('/total').on('value', datasnapshot => {
      this.setState({ total: datasnapshot.val() });
    });
    db.ref('/completed').on('value', datasnapshot => {
      this.setState({ completed: datasnapshot.val() });
    });
  }
  render() {
    const {
      modalStyle,
      containerStyle,
      headerStyle,
      contentStyle,
      contentRowStyle,
      itemStyle,
      buttonContainerStyle,
      openButtonStyle,
      item,
      data,
      label,
      bar,
      dataNumber
    } = styles;

    const widthMutiplier = (this.props.active <= 12) ? 20 : ((SCREEN_WIDTH - 100) * (1 - (2 * marginPerc)) / this.props.active);


    const today = new Date();
    const date = `${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return (
        <View>
          <Modal
              visible={this.props.modalOpen}
              animationType={'slide'}
              onRequestClose={this.props.closeModal}
          >
            <View style={modalStyle}>
              <View style={containerStyle}>
                  <View style={headerStyle}>
                    <Text style={{ fontSize: 22, color: 'white' }}>
                      {date}
                    </Text>
                  </View>
                  <View style={contentStyle}>
                    <View style={contentRowStyle}>
                      <Icon name='format-list-bulleted' color={DISPLAY_TEXT_COLOR} />
                      <Text style={itemStyle}>
                        You have {this.state.total} to-do items.
                      </Text>
                    </View>
                    <View style={contentRowStyle}>
                      <Icon name='done' color={DISPLAY_TEXT_COLOR} />
                      <Text style={itemStyle}>
                        You completed {this.state.completed} items.
                      </Text>
                    </View>
                    <View style={contentRowStyle}>
                      <Icon name='check-box-outline-blank' color={DISPLAY_TEXT_COLOR} />
                      <Text style={itemStyle}>
                        You still have {this.state.total - this.state.completed} items to complete.
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.35, marginLeft: 10 }}>
                    <View style={item}>
                        <View style={data}>
                          <Icon style={label} name='format-list-bulleted' color={DISPLAY_TEXT_COLOR} />
                          <Animated.View style={[bar, { width: widthMutiplier * this.state.total }]} />

                          <Text style={dataNumber}>{this.state.total}</Text>
                        </View>
                    </View>
                    <View style={item}>
                        <View style={data}>
                          <Icon style={label} name='done' color={DISPLAY_TEXT_COLOR} />
                          <Animated.View style={[bar, { width: widthMutiplier * this.state.completed }]} />

                          <Text style={dataNumber}>{this.state.completed}</Text>
                        </View>
                    </View>
                    <View style={item}>
                        <View style={data}>
                          <Icon style={label} name='check-box-outline-blank' color={DISPLAY_TEXT_COLOR} />
                          <Animated.View style={[bar, { width: widthMutiplier * (this.state.total - this.state.completed) }]} />

                          <Text style={dataNumber}>{this.state.total - this.state.completed}</Text>
                        </View>
                    </View>
                  </View>
                  <View style={buttonContainerStyle}>
                    <Button
                      raised
                      backgroundColor={THEME_COLOR}
                      onPress={this.props.closeModal}
                      title="Close"
                    />
                  </View>
              </View>
            </View>
          </Modal>
          <Button
            raised
            containerStyle={openButtonStyle}
            backgroundColor={THEME_COLOR}
            icon={{ name: 'chart-bar', type: 'material-community' }}
            onPress={this.props.openModal}
            title="View Your Stats"
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  modalOpen: state.modal.modalOpen,
});

const mapDispatchToProps = dispatch => ({
  openModal: () => {
    dispatch(OpenModal());
  },
  closeModal: () => {
    dispatch(CloseModal());
  }
});

const StatsModal = connect(mapStateToProps, mapDispatchToProps)(StatsModalComp);

export default StatsModal;

const marginPerc = 0.05;

const styles = {
  modalStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  containerStyle: {
    flex: 1,
    marginTop: SCREEN_HEIGHT * marginPerc,
    marginBottom: SCREEN_HEIGHT * marginPerc,
    marginLeft: SCREEN_WIDTH * marginPerc,
    marginRight: SCREEN_WIDTH * marginPerc,
    backgroundColor: 'white'
  },
  headerStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR
  },
  contentStyle: {
    flex: 0.5, //0.7s
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  contentRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemStyle: {
    alignItems: 'center',
    marginLeft: 4,
    fontSize: 16,
    textAlign: 'center',
    color: DISPLAY_TEXT_COLOR
  },
  buttonContainerStyle: {
    paddingBottom: 10,
    flex: 0.15,
    justifyContent: 'flex-end'
  },
  openButtonStyle: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  item: {
    flexDirection: 'column',
    flex: 0.2,
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 10
  },
  label: {
    color: DISPLAY_TEXT_COLOR,
    fontSize: 10,
    height: 8,
    alignSelf: 'center',
    marginRight: 5
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: DISPLAY_TEXT_COLOR,
    fontSize: 16,
    marginLeft: 5,
    alignSelf: 'center'
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: THEME_COLOR_LIGHT
  }
};
