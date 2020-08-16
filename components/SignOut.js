import React from 'react';
import { View, StyleSheet, Button  } from 'react-native';
import auth from '@react-native-firebase/auth';

function SignOut() {

   onSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
     }

  return (
    <View style={styles.container}>
      <View style = {styles.button}>
        <Button color='#ff9935' title="Sign Out" onPress={onSignOut}/>
      </View>
    </View>
  );
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
  button: {
    padding: 10,
    fontSize: 15,
    fontFamily: "arial",
    width: '70%',
    height: 40,
    textAlign: "center",
    margin: 20
  },
})


export default SignOut;