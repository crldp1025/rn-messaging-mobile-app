import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Avatar from './Avatar';
import Text from './Text';
import { IUserProps } from '../../interfaces/User';

interface IProfileProps {
  user: IUserProps;
}

const Profile = ({user}: IProfileProps) => {
  const [avatarAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    Animated.timing(avatarAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, []);
  
  return (
    <>
      <View style={styles.avatarWrapper}>
        <Animated.View
          style={{
            width: 120,
            transform: [
              {
                translateY: avatarAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-headerHeight + (headerHeight / 4), 0]
                }),
              },
              {
                scale: avatarAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.35, 1]
                }),
              }
            ]
          }}>
          <Avatar 
            name={user.firstName}
            url={user.avatar}
            size='lg' />
        </Animated.View>
      </View>
      <View>
        <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    textAlign: 'center',
    marginTop: 10
  },
  email: {
    textAlign: 'center'
  }
});

export default Profile;