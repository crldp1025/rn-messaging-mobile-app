import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';

interface IAvatarProps {
  url?: string;
}

const Avatar = ({url = 'undefined'}: IAvatarProps) => {
  return (
    <View style={styles.container}>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 100
  }
});

export default Avatar;