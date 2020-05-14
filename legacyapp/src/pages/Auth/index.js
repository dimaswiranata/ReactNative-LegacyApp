import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import NavigationUtils from '../../utils/navigation.utils';
import ImageUtils from '../../utils/images.utils';
import Icon from '../../components/Icon';

class AuthScreen extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: true,
    showConfirmPassword: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  }

  showPasswordHandler = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  showConfirmPasswordHandler = () => {
    this.setState({showConfirmPassword: !this.state.showConfirmPassword});
  }

  handleEmailChange = (value) => {
    let isValid = true;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value);

    if (value.trim().length >= 0 ) {
      this.setState({password: value, isValidUser: isValid});
    }
  }

  handlePasswordChange = (value) => {
    if (value.trim().length >= 6 ) {
      this.setState({password: value, isValidPassword: true});
    } else {
      this.setState({password: value, isValidPassword: false});
    }
  }

  handleConfirmPasswordChange = (value) => {
    if (value.trim() === this.state.password ) {
      this.setState({confirmPassword: value, isValidConfirmPassword: true});
    } else {
      this.setState({confirmPassword: value, isValidConfirmPassword: false});
    }
  }

  loginHandler= () => {
    NavigationUtils.navigate('InApp');
  }

  render () {
    return (
      <ImageBackground source={ImageUtils.BACKGROUND_IMG} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.textHeading}>Please Log In</Text>
          <Button  
            title='Switch to Login'
            buttonStyle={styles.button}
            onPress={() => alert('Hello')}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder='email@address.com'
              onChangeText={value => this.handleEmailChange(value)}
              errorMessage={!this.state.isValidUser ? 'Please enter a valid email address' : null}
              leftIcon={
                <Icon 
                  name="mail" 
                  type='Entypo' 
                  color='gray' 
                  size={24} 
                />
              }
              inputContainerStyle={styles.input}
            />
            <Input
              placeholder='Password'
              secureTextEntry={!this.state.showPassword ? false : true}
              onChangeText={value => this.handlePasswordChange(value)}
              errorMessage={!this.state.isValidPassword ? 'Password at least 6 characters' : null}
              leftIcon={
                <Icon 
                  name="lock" 
                  type='Entypo' 
                  color='gray' 
                  size={24} 
                />
              }
              rightIcon={
                <TouchableOpacity onPress={this.showPasswordHandler}>
                  { !this.state.showPassword ? (
                    <Icon 
                      name="md-eye"
                      type='Ionicons' 
                      color='gray' 
                      size={24} 
                    /> 
                    ):(
                    <Icon 
                      name="md-eye-off"
                      type='Ionicons' 
                      color='gray' 
                      size={24} 
                    /> 
                    )
                  }
                </TouchableOpacity>
              }
              inputContainerStyle={styles.input}
            />
            <Input
              placeholder='Confirm Password'
              secureTextEntry={!this.state.showConfirmPassword ? false : true}
              onChangeText={value => this.handleConfirmPasswordChange(value)}
              errorMessage={!this.state.isValidConfirmPassword ? 'The confirmation and password do not match' : null}
              leftIcon={
                <Icon 
                  name="lock" 
                  type='Entypo' 
                  color='gray' 
                  size={24} 
                />
              }
              rightIcon={
                <TouchableOpacity onPress={this.showConfirmPasswordHandler}>
                  { !this.state.showConfirmPassword ? (
                    <Icon 
                      name="md-eye"
                      type='Ionicons' 
                      color='gray' 
                      size={24} 
                    /> 
                    ):(
                    <Icon 
                      name="md-eye-off"
                      type='Ionicons' 
                      color='gray' 
                      size={24} 
                    /> 
                    )
                  }
                </TouchableOpacity>
              }
              inputContainerStyle={styles.input}
            />
          </View>
          <Button  
            title='Submit' 
            onPress={() => this.loginHandler()}
            buttonStyle={styles.button}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '90%'
  },
  textHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 5,
    margin: 8,
    backgroundColor: '#eee',
    borderRadius: 10
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: 300
  }
})

export default AuthScreen;