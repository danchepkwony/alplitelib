import React, { useState, useEffect } from 'react';

import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import SignOut from './SignOut.js';
import Loading from './Loading.js';
import Home from './Home.js';
import CheckOut from './CheckOut.js';
import RegisterBorrower from './RegisterBorrower.js';

import auth from '@react-native-firebase/auth';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image, FlatList } from 'react-native';

import gear from './../images/gear.png';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


  HomeScreen = (props) => {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
                 tabBarIcon: ({ focused, color, size }) => {
                   let icon;
                   if(route.name == "Options" ){ icon = {gear} }
                   return <Image size={size} color={color} source={icon} />;
                 },
               })}
               tabBarOptions={{
                 showIcon: true,
                 activeTintColor: '#ff9935',
                 inactiveTintColor: 'gray',
               }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Check Out" component={CheckOut} />
          <Tab.Screen name="Options" component={SignOut} />
        </Tab.Navigator>);
  }

  return (
    <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterBorrower} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
