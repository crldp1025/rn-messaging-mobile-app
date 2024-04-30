import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import Text from './Text';

interface IAvatarProps {
  name: string;
  url?: string | undefined;
}

const Avatar = ({name, url = undefined}: IAvatarProps) => {
  const getUserInital = (name: string) => {
    return name.substring(0, 1);
  }
  
  return (
    <View style={styles.container}>
      {!url &&
        <Text style={styles.text}>
          {getUserInital(name)}
        </Text>
      }
      {url &&
        <Image style={styles.image} src={url} />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  text: {
    fontSize: 35,
    fontWeight: '600',
    color: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

export default Avatar;