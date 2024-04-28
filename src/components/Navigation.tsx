import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Contacts from '../screens/Contacts';
import Settings from '../screens/Settings';
import Icon from './Icon';
import Chat from '../screens/Chat';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false
        }}
        initialRouteName='Chat'>
        <Tab.Screen 
          name='Contacts' 
          component={Contacts}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon type='font-awesome-5' name='users' size={size} color={color} />
            )
          }} />
        <Tab.Screen 
          name='Chat' 
          component={Chat}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon type='ionicon' name='chatbubble' size={size} color={color} />
            )
          }} />
        <Tab.Screen 
          name='Sttings' 
          component={Settings}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon type='font-awesome' name='cog' size={size} color={color} />
            )
          }} />
      </Tab.Navigator>
    </>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
};

export default Navigation;