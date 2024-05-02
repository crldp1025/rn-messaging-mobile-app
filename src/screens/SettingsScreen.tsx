import React from 'react';
import Text from '../components/common/Text';
import Container from '../components/common/Container';
import Profile from '../components/common/Profile';
import { userAuth } from '../constants/User';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '../components/common/Button';
import colors from '../themes/colors';
import Icon from '../components/common/Icon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/common/Navigation';

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOnPressLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'destructive'},
      {
        text: 'Confirm'
      }
    ]);
  }
  
  return (
    <Container>
      <ScrollView style={styles.container}>
        <Profile user={userAuth} />
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Settings</Text>
          <Button
            style={[styles.listItem, styles.topBorder]}
            type='clear'
            color={colors.black}
            align='left'
            leftIcon={<Icon type='feather' name='camera' size={20} />}
            rightIcon={<Icon type='feather' name='chevron-right' size={20} />}>
            Change Profile Picture
          </Button>
          <Button
            style={styles.listItem}
            type='clear'
            color={colors.black}
            align='left'
            leftIcon={<Icon type='feather' name='user' size={20} />}
            rightIcon={<Icon type='feather' name='chevron-right' size={20} />}
            onPress={() => navigation.navigate('EditProfile')}>
            Edit Profile
          </Button>
          <Button
            style={styles.listItem}
            type='clear'
            color={colors.black}
            align='left'
            leftIcon={<Icon type='ionicon' name='key-outline' size={20} />}
            rightIcon={<Icon type='feather' name='chevron-right' size={20} />}
            onPress={() => navigation.navigate('ChangePassword')}>
            Change Password
          </Button>
          <Button
            style={styles.listItem}
            type='clear'
            color={colors.red}
            align='left'
            leftIcon={<Icon type='material' name='logout' size={20} color={colors.red} />}
            onPress={() => handleOnPressLogout()}>
            Logout
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  listContainer: {
    marginTop: 30
  },
  listTitle: {
    marginBottom: 10,
    paddingHorizontal: 16,
    color: colors.dark,
    fontWeight: '700'
  },
  listItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.lightGray2
  },
  topBorder: {
    borderTopWidth: 1,
    borderColor: colors.lightGray2
  }
});

export default SettingsScreen;