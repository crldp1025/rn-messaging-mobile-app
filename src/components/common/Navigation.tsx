import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../tools/hooks';
import { authenticateUser } from '../../state/authSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type RootStackParamList = {
  Home?: undefined;
  Conversation: {chatId: string, data: IUserProps};
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
            title: route.params?.data.displayName,
            headerRight: () => (
              <View>
                <Avatar 
                  name={route.params?.data.displayName}
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Registration' component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleAuthListener = () => {
    auth().onAuthStateChanged(async (resUser) => {
      let authUser: IUserProps | undefined = undefined;
      if(resUser !== null) {
        authUser = {
          email: resUser.email!,
          displayName: resUser.displayName!
        };
        const userDetails = await firestore().collection('Users').where('email', '==', resUser.email).get();
        if(userDetails.size > 0) authUser.id = userDetails.docs[0].id;
      } else {
        authUser = undefined;
      }
      setInitializing(false);
      dispatch(authenticateUser(authUser));
    });
  }
  
  useEffect(() => {
    handleAuthListener();

    return () => {
      handleAuthListener();
    };
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
      {user &&
        <BottomNavigator />
      }
      {!user &&
        <UnauthenticatedScreens />
      }
    </NavigationContainer>
  );
};

export default Navigation;