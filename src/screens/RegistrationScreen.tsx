import React, { useEffect, useState } from 'react';
import Text from '../components/common/Text';
import Container from '../components/common/Container';
import { Alert, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import colors from '../themes/colors';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../tools/hooks';
import { IUserRegistrationProps } from '../interfaces/User';
import { registerUser, resetRegistrationState } from '../state/registrationSlice';

const initialState: IUserRegistrationProps = {
  email: '',
  password: '',
  retypePassword: '',
  displayName: ''
};

const RegistrationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [user, setUser] = useState<IUserRegistrationProps>(initialState);
  const {loading, success, error} = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!loading && !success && error) {
      Alert.alert('Error', error, [{text: 'OK'}]);
    }
  }, [loading, success, error]);

  useEffect(() => {
    return () => {dispatch(resetRegistrationState())}
  }, []);
  
  return (
    <Container>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Image 
            source={require('../assets/images/default-icon.png')}
            style={{
              width: 200,
              height: 100,
              objectFit: 'contain'
            }} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Email*'
              autoCapitalize='none'
              value={user.email}
              onChangeText={text => setUser({...user, email: text})} />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Password*'
              autoCapitalize='none'
              secureTextEntry={true}
              value={user.password}
              onChangeText={text => setUser({...user, password: text})}  />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Re-type Password*'
              autoCapitalize='none'
              secureTextEntry={true}
              value={user.retypePassword}
              onChangeText={text => setUser({...user, retypePassword: text})}  />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Display Name*'
              value={user.displayName}
              onChangeText={text => setUser({...user, displayName: text})}  />
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Button
              onPress={() => dispatch(registerUser(user))}>
              Sign Up
            </Button>
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Button 
              type='clear' 
              color={colors.black}
              onPress={() => navigation.navigate('Login')}>
              Already have an account? <Text style={{color: colors.primary}}>Sign in</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 16,
  },
  textInputWrapper: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  textInput: {

  }
});

export default RegistrationScreen;