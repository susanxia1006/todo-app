import React, { Component } from 'react';
import { Text, StyleSheet, View, Platform, Image, ScrollView, TextInput } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import { STATUS_BAR_HEIGHT, THEME_COLOR, SCREEN_WIDTH } from '../utils/constants';

export default class LoginIn extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password: ''
    });
  }

  signUp = () => {
    try {
      if (this.state.password.length < 6) {
        alert('The password must be at least 6 characters.');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
    }
    catch (e) {
      console.log(e);

    }
  }

  loginIn = () => {
    try {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        console.log(user.uid);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#FFF' }}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={(email) => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
            />
          </Item>

          <Container style={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center' }}>
            <Button
              primary
              bordered
              rounded
              block
              onPress={() => this.loginIn()}
            >
              <Text>Login In</Text>
            </Button>

            <Button
              light
              bordered
              rounded
              block
              onPress={() => this.signUp()}
            >
              <Text>Sign Up</Text>
            </Button>
          </Container>
        </Form>

      </Container>
    );
  }
}
