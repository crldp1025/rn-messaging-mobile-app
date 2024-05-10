import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MessageScreen from './MessageScreen';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Icon from '../components/common/Icon';
import colors from '../themes/colors';
import ContactsScreen from './ContactsScreen';
import SettingsScreen from './SettingsScreen';
import { TouchableOpacity } from 'react-native';
import ChatScreen from './ChatScreen';
import { useAppDispatch, useAppSelector } from '../tools/hooks';
import { getAllContacts } from '../state/contactSlice';
import { getAllChats } from '../state/chatSlice';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const chatsRef = firestore().collection('Chats');
const contactsRef = firestore().collection('Contacts');

const Tab = createBottomTabNavigator();  

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleContactListener = () => {
    contactsRef
    .where('userId', '==', user?.id)
    .onSnapshot(async (contactsSnapshot) => {
      dispatch(getAllContacts(contactsSnapshot));
    }, error => {
      console.log(error)
    });
  };

  const handleChatListener = () => {
    chatsRef
    .where('users', 'array-contains', user?.id)
    .orderBy('updatedAt', 'desc') 
    .onSnapshot(async (chatSnapshot) => {
      dispatch(getAllChats({authUserId: user?.id as string, chatSnapshot: chatSnapshot}))
    }, error => {
      console.log('error', error)
    });
  };

  useEffect(() => {
    handleContactListener();
    handleChatListener();

    return () => {
      handleContactListener();
      handleChatListener();
    };
  }, []);

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
      initialRouteName='Chat'>
      <Tab.Screen 
        name='Contact' 
        component={ContactsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon type='font-awesome-5' name='users' size={size} color={color} />
          )
        }} />
      <Tab.Screen 
        name='Chat' 
        component={ChatScreen}
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
          title: 'My Profile',
          tabBarIcon: ({color, size}) => (
            <Icon type='font-awesome' name='cog' size={size} color={color} />
          )
        }} />
    </Tab.Navigator>  
  );
};

export default HomeScreen;