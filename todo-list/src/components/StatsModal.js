import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { OpenModal, CloseModal } from '../actions';

class StatsModalComp extends Component {

  render() {
    return (
        <View style={styles.container}>
          <Modal
              visible={this.props.modalOpen}
              animationType={'slide'}
              onRequestClose={this.props.closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text>You have {this.props.active} to-do items.</Text>
                <Text>You completed {this.props.completed} to-do items.</Text>
                <Text>You still have {this.props.active - this.props.completed} to-do items to complete.</Text>
                <Button
                    onPress={this.props.closeModal}
                    title="Close modal"
                />
              </View>
            </View>
          </Modal>
          <Button
              onPress={this.props.openModal}
              title="Open modal"
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
});
