import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import logo from './../images/litelibrary.png';
import auth from '@react-native-firebase/auth';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onLogin = () => {
   if (this.state.password != '' && this.state.email != ''){
    auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess)
      .catch(err => {
        if (err.code === 'auth/invalid-email'){this.setState({
            error: "User not found"
          })}
        else if (err.code === 'auth/user-not-found'){this.setState({
                      error: "User not found"
                    })}
         else if (err.code === 'auth/wrong-password'){this.setState({
             error: "Incorrect password"
           })}
         else { this.setState({ error: "Invalid entry"}) }
      })}
  }

  onLoginSuccess = () => {
    this.setState({
      error: '',
      loading: false
    })
  }

// Don't have time to finish this:

//  forgotPassword = (Email) => {
//    auth().sendPasswordResetEmail(Email)
//      .then(function (user) {
//        alert('Password Reset has been sent to your email!')
//      }).catch(function (e) {
//        console.log(e)
//      })
//  }

//        <TouchableOpacity onPress={this.forgotPassword}>
//          <Text style={styles.forgotPassword}> Forgot Password? </Text>
//        </TouchableOpacity>

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <Text style={styles.text}> Email </Text>
        <TextInput style={styles.input} value={this.state.email} onChangeText={email => this.setState({ email })} />
        <Text style={styles.text}> Password </Text>
        <TextInput style={styles.input} value={this.state.password} onChangeText={password => this.setState({ password })} />
        <Text style={styles.errorText} >
          {this.state.error}
        </Text>
        <View style={styles.button}>
          <Button color='#ff9935' title="Login" onPress={this.onLogin} />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.newUser}> New User? Sign Up </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7d6',
    padding: 8,
  },
  logo: {
    width: '70%',
    height: 81,
  },
  text: {
    width: '70%',
    textAlign: "left",
    color: '#F57A00',
    paddingBottom: 7.5,
    fontFamily: "arial",
    fontSize: 11,
    fontWeight: 'bold'
  },
  input: {
    paddingVertical: 0,
    width: '70%',
    height: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2.62,
    marginBottom: 7.5
  },
  button: {
    padding: 10,
    fontSize: 15,
    fontFamily: "arial",
    width: '70%',
    height: 40,
    textAlign: "center",
    margin: 20
  },
//  forgotPassword: {
//    paddingTop: 10,
//    fontWeight: 'bold',
//    fontSize: 15,
//    fontFamily: 'arial',
//    color: '#b4bc4d'
//  },
  newUser: {
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'arial',
    color: '#b4bc4d'
  },
  errorText: {
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'arial',
    color: '#D21404'
  }
});

export default SignIn;