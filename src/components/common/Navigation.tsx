import React from 'react';
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from './Icon';
import LoginScreen from '../../screens/LoginScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';
import HomeScreen from '../../screens/HomeScreen';
import ConversationScreen from '../../screens/ConversationScreen';
import { IMessageProps } from '../../interfaces/Message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../themes/colors';

export type RootStackParamList = {
  Home?: undefined;
  Conversation: {data: IMessageProps};
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
          headerBackTitleVisible: false
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
            title: route.params?.data.sender.name,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon type="feather" name="chevron-left" size={30} />
              </TouchableOpacity>
            )
          })} />
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