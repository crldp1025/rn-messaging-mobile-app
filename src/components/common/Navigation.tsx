import React from 'react';
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import HomeScreen from '../../screens/HomeScreen';
import ConversationScreen from '../../screens/ConversationScreen';
import ContactDetailsScreen from '../../screens/ContactDetailsScreen';
import Avatar from './Avatar';
import { View } from 'react-native';
import { IUserProps } from '../../interfaces/User';
import EditProfileScreen from '../../screens/EditProfileScreen';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';

export type RootStackParamList = {
  Home?: undefined;
  Conversation: {data: IUserProps};
  ContactDetails: {data: IUserProps};
  EditProfile: undefined;
  ChangePassword: undefined;
  Login?: undefined;
  Registration?: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const BottomNavigator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen 
          name='Home' 
          component={HomeScreen}
          options={{
            title: '',
            headerShown: false
          }} />
        <Stack.Screen 
          name='Conversation' 
          component={ConversationScreen}
          options={({route}) => ({
            title: `${route.params?.data.firstName} ${route.params?.data.lastName}`,
            headerRight: () => (
              <View>
                <Avatar 
                  name={`${route.params?.data.firstName} ${route.params?.data.lastName}`}
                  size='sm'
                  url={route.params?.data.avatar} />
              </View>
            )
          })} />
        <Stack.Screen 
          name='ContactDetails' 
          component={ContactDetailsScreen}
          options={({route}) => ({
            title: '',
            headerTransparent: true
          })} />
        <Stack.Screen 
          name='EditProfile' 
          component={EditProfileScreen}
          options={{
            title: 'Edit Profile'
          }} />
        <Stack.Screen 
          name='ChangePassword' 
          component={ChangePasswordScreen}
          options={{
            title: 'Change Password'
          }} />
      </Stack.Navigator>
    </>
  );
};

const UnauthenticatedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Registration' component={RegistrationScreen} />
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