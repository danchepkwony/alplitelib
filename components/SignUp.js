import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import logo from './../images/litelibrary.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: false
  }

  onSignUp = () => {
    console.log(this.state.email);
    if (this.state.password == this.state.confirmPassword && this.state.password != '' && this.state.email != '' && this.state.confirmPassword != '') {
       console.log('success');
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onSignUpSuccess)
        .catch(err => {
          if (err.code === 'auth/email-already-in-use'){this.setState({
            error: "Email is already in use"
          })}
          if (err.code === 'auth/invalid-email'){this.setState({
            error: "Email is invalid"
          })}
          else if (err.code === 'auth/weak-password'){this.setState({
              error: "Weak password"
            })}
          else { this.setState({ error: err.code }) }
        })
    }
    else {
      this.setState({
        error: "Passwords do not match"
      })
    }
  }

  onSignUpSuccess = () => {
    this.setState({
      error: '',
      loading: false
    })

    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set({
        email: this.email
      })
      .then(() => {
        console.log('User added!');
      });

    auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then()
          .catch()
  }

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
        <Text style={styles.text}> Confirm Password </Text>
        <TextInput style={styles.input} value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
        <Text style={styles.errorText} >
          {this.state.error}
        </Text>
        <View style={styles.button}>
          <Button color='#ff9935' title="Sign Up" onPress={this.onSignUp} />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
          <Text style={styles.oldUser}> Have an Account? Sign In </Text>
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
      height: 20,
    width: '70%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2.62,
    marginBottom: 7.5,
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
  oldUser: {
    paddingTop: 10,
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

export default SignUp;