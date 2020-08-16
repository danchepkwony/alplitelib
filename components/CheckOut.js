import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
//import { Dropdown } from 'react-native-material-dropdown';
//import SearchableDropdown from 'react-native-searchable-dropdown';
import plus from './../images/plusbutton.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


function CheckOut (){

    const [name, setName] = useState();
        const [gender, setGender] = useState();
        const [age, setAge] = useState();
        const [title, setTitle] = useState();
        const [an, setAn] = useState();
        const [due, setDue] = useState();

        function submitData(){
            firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .collection('checkedOut')
                  .doc(name)
                  .set({
                    name: name,
                    gender: gender,
                    age: age,
                    title: title,
                    accession: an,
                    due: due,
                  })
                  .then(() => {
                    console.log('Checked out!');
                  });
            alert("Item Checked Out!")

        }

    return (
      <ScrollView style={styles.container} justifyContent='center'>
                <Text style={styles.title}> New Check Out </Text>

                <Text style={styles.text}> Borrower's Name </Text>
                <View style={styles.borrower}>
                  <TextInput style={styles.inputBorrower} onChangeText={setName} value={name} />
                  <TouchableOpacity style={styles.plusContainer} onPress={() => this.props.navigation.navigate("RegisterScreen")}>
                    <Image style={styles.plus} source={plus} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.text}> Male or Female </Text>
                <TextInput style={styles.input} onChangeText={setGender} value={gender} />

                <Text style={styles.text}> Age </Text>
                <TextInput style={styles.input}  onChangeText={setAge} value={age} />

                <Text style={styles.text}> Title </Text>
                <TextInput style={styles.input}  onChangeText={setTitle} value={title}/>

                <Text style={styles.text}> Accession Number </Text>
                <TextInput style={styles.input}  onChangeText={setAn} value={an}/>

                <Text style={styles.text}> Due Date </Text>
                <TextInput style={styles.input}  onChangeText={setDue} value={due} />

                <View style={styles.button}>
                  <Button color="#ff9935" title="Submit" onPress={submitData} />
                </View>
            </ScrollView>
          );
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff7d6',
          paddingTop: 40,
          paddingBottom: 50,
          padding: 36,
          height: Dimensions.get('window').height,
          width:  Dimensions.get('window').width,
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
          color: '#F57A00',
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
        borrower:{
          width: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10%',
        },
        inputBorrower: {
         paddingVertical: 0,
          width: '80%',
          height: 20,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,},
           shadowOpacity: 0.1,
           shadowRadius: 2.62,
         },
        plusContainer: {
          width: '20%',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
        plus: {
          width: undefined,
          height: '100%',
          aspectRatio: 1,
        },
      });

export default CheckOut;
