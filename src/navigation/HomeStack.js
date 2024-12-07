import React from 'react';
import {View, Text,} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFa from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfilScreen from '../screens/Home/ProfilScreen';
import PiyasaScreen from '../screens/Home/PiyasaScreen';
import AlSatScreen from '../screens/Home/AlSatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#f00',
        inactiveTintColor: '#fff',
        style: {
          height: 70,
          backgroundColor: '#000',
          padding: 10,
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 18,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="PiyasaScreen"
        component={PiyasaScreen}
        options={{
          tabBarLabel: 'Piyasalar',
          tabBarIcon: ({color, size}) => (
            <IconFa name="bitcoin" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="AlSatScreen"
        component={AlSatScreen}
        options={{
          tabBarLabel: 'Kolay Al/Sat',
          tabBarIcon: ({color, size}) => (
            <IconFa name="exchange" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;