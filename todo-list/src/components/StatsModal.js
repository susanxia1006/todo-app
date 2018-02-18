import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { OpenModal, CloseModal } from '../actions';
import { SCREEN_WIDTH, SCREEN_HEIGHT, THEME_COLOR, DISPLAY_TEXT_COLOR, MONTHS } from '../utils/constants';

class StatsModalComp extends Component {
  render() {
    const {
      modalStyle,
      containerStyle,
      headerStyle,
      contentStyle,
      contentRowStyle,
      itemStyle,
      buttonContainerStyle,
      openButtonStyle
    } = styles;


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
                {/*<ScrollView>*/}
                  <View style={headerStyle}>
                    <Text style={{ fontSize: 22, color: 'white' }}>
                      {date}
                    </Text>
                  </View>
                  <View style={contentStyle}>
                    <View style={contentRowStyle}>
                      <Icon name='format-list-bulleted' />
                      <Text style={itemStyle}>
                        You have {this.props.active} to-do items.
                      </Text>
                    </View>
                    <View style={contentRowStyle}>
                      <Icon name='done' />
                      <Text style={itemStyle}>
                        You completed {this.props.completed} to-do items.
                      </Text>
                    </View>
                    <View style={contentRowStyle}>
                      <Icon name='check-box-outline-blank' />
                      <Text style={itemStyle}>
                        You still have {this.props.active - this.props.completed} to-do items to complete.
                      </Text>
                    </View>
                  </View>
                {/*</ScrollView>*/}
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
  active: state.todos.length,
  completed: state.todos.filter((x) => x.completed).length
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
    flex: 0.7,
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
    flex: 0.3,
    justifyContent: 'flex-end'
  },
  openButtonStyle: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  }
};
