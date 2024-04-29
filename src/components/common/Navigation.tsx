import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from '../../screens/ContactsScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import Icon from './Icon';
import MessageScreen from '../../screens/MessageScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import colors from '../../themes/colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            shadowColor: colors.gray
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary
        }}
        initialRouteName='MessageScreen'>
        <Tab.Screen 
          name='ContactsScreen' 
          component={ContactsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon type='font-awesome-5' name='users' size={size} color={color} />
            ),
          }} />
        <Tab.Screen 
          name='MessageScreen' 
          component={MessageScreen}
          options={{
            title: 'Chats',
            tabBarIcon: ({color, size}) => (
              <Icon type='ionicon' name='chatbubble' size={size} color={color} />
            )
          }} />
        <Tab.Screen 
          name='SettingsScreen' 
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon type='font-awesome' name='cog' size={size} color={color} />
            )
          }} />
      </Tab.Navigator>
    </>
  );
};

const Stack = createNativeStackNavigator();

const UnauthenticatedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
    </Stack.Navigator>
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