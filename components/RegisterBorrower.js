import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import exit from './../images/exit.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function RegisterBorrower({navigation}) {
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [number, setNumber] = useState();
    const [email, setEmail] = useState();

    function submitData(){
        firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .collection('borrowers')
              .doc(name)
              .set({
                name: name,
                gender: gender,
                age: age,
                number: number,
                email: email,
              })
              .then(() => {
                console.log('User added!');
              });
         navigation.navigate("HomeScreen")
    }

    return (
      <ScrollView style={styles.container}>

        <View style={styles.topBar}>
          <TouchableOpacity style={styles.exitContainer} onPress={() => navigation.navigate("HomeScreen")}>
              <Image style={styles.exit} source={exit} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}> Register New Client </Text>

          <Text style={styles.text}> Name </Text>
          <TextInput style={styles.input} onChangeText={setName} value={name} />

          <Text style={styles.text}> Male or Female </Text>
          <TextInput style={styles.input} onChangeText={setGender} value={gender} />

          <Text style={styles.text}> Age </Text>
          <TextInput style={styles.input} onChangeText={setAge} value={age} />

          <Text style={styles.text}> Phone Number </Text>
          <TextInput style={styles.input} onChangeText={setNumber} value={number} />

          <Text style={styles.text}> Email </Text>
          <TextInput style={styles.input} onChangeText={setEmail} value={email} />

          <View style={styles.button}>
            <Button color="#b4bc4d" title="Submit" onPress={submitData} />
          </View>
        </View>
      </ScrollView>
    );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff7d6',
    height: Dimensions.get('window').height,
    width:  Dimensions.get('window').width,
  },
  topBar: {
    height: '5%',
    width: '100%',
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  body: {
    height: '95%',
    width: '100%',
    margin: 0,
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    color: '#6d5f22',
    paddingTop: '10%',
    paddingBottom: '10%',
    fontFamily: 'arial',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    width: '100%',
    textAlign: 'left',
    color: '#b4bc4d',
    paddingBottom: 7.5,
    fontFamily: 'arial',
    fontSize: 11,
    fontWeight: 'bold',
  },
  input: {
    paddingVertical: 0,
    width: '100%',
    height: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    marginBottom: '10%',
  },
  button: {
    padding: '5%',
    fontSize: 15,
    fontFamily: 'arial',
    width: '100%',
    textAlign: 'center',
  },
  exitContainer: {
    width: '12%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '4%',
    marginTop: 50,
  },
  exit: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
  },
});

export default RegisterBorrower;