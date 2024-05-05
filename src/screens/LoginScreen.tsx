import React, { useState } from 'react';
import Text from '../components/common/Text';
import Container from '../components/common/Container';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import TextInput from '../components/common/TextInput';
import colors from '../themes/colors';
import Button from '../components/common/Button';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../tools/hooks';
import { loginUser, logoutUser } from '../state/authSlice';
import { IUserLoginProps } from '../interfaces/User';

const initialState: IUserLoginProps = {
  email: '',
  password: ''
};

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [login, setLogin] = useState<IUserLoginProps>(initialState); 
  const dispatch = useAppDispatch();

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
              placeholder='Email'
              autoCapitalize='none'
              value={login.email}
              onChangeText={text => setLogin({...login, email: text})} />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Password'
              secureTextEntry={true}
              value={login.password}
              onChangeText={text => setLogin({...login, password: text})} />
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Button
              onPress={() => dispatch(loginUser(login))}>
              Login
            </Button>
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Button 
              type='clear' 
              color={colors.black}
              onPress={() => navigation.navigate('Registration')}>
              Don't have an account yet? <Text style={{color: colors.primary}}>Sign up now</Text>
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

export default LoginScreen;