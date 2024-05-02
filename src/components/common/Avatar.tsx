import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import Text from './Text';

type AvatarSize = 'sm' | 'md' | 'lg';

interface IAvatarProps {
  name: string;
  size?: AvatarSize;
  url?: string | undefined;
}

const avatarSizes = {
  'sm' : {
    wrapper: {width: 35, height: 35},
    defaultAvatar: {fontSize: 25}
  },
  'md': {
    wrapper: {width: 50, height: 50},
    defaultAvatar: {fontSize: 35}
  },
  'lg': {
    wrapper: {width: 120, height: 120},
    defaultAvatar: {fontSize: 80, top: -4}
  },
}

const Avatar = ({name, size = 'md', url = undefined}: IAvatarProps) => {
  const getUserInital = (name: string) => {
    return name.substring(0, 1);
  }

  const avatarStyle = useMemo(() => {
    const style = avatarSizes[size];

    return style;
  }, [size]);
  
  return (
    <View style={[styles.container, avatarStyle.wrapper]}>
      {!url &&
        <Text style={[styles.text, avatarStyle.defaultAvatar]}>
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