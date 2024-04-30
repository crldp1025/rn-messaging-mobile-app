import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MessageScreen from './MessageScreen';
import { NavigatorScreenParams, ParamListBase, useNavigation } from '@react-navigation/native';
import Icon from '../components/common/Icon';
import { IMessageProps } from '../interfaces/Message';
import colors from '../themes/colors';
import ContactsScreen from './ContactsScreen';
import SettingsScreen from './SettingsScreen';

export type RootStackParamList = {
  Message: NavigatorScreenParams<ParamListBase>;
  Conversation: {data: IMessageProps};
};

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Tab.Navigator
    screenOptions={{
      headerStyle: {
        shadowColor: colors.gray
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: colors.primary
      },
      tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
      tabBarActiveTintColor: colors.white,
    }}
    initialRouteName='Message'>
    <Tab.Screen 
      name='Contact' 
      component={ContactsScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon type='font-awesome-5' name='users' size={size} color={color} />
        ),
      }} />
      <Tab.Screen 
        name='Message' 
        component={MessageScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({color, size}) => (
            <Icon type='ionicon' name='chatbubble' size={size} color={color} />
          ),
        }} />
    <Tab.Screen 
      name='Settings' 
      component={SettingsScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon type='font-awesome' name='cog' size={size} color={color} />
        )
      }} />
  </Tab.Navigator>
  );
};

export default HomeScreen;