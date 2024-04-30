import React, { useMemo } from 'react';
import { Dimensions, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import colors from '../../themes/colors';
import Text from './Text';

export type BubbleType = 'sent' | 'received';

interface IBubbleProps {
  type: BubbleType;
  message: string;
}

const Bubble = ({type = 'sent', message}: IBubbleProps) => {
  const bubbleStyle = useMemo(() => {
    let container: StyleProp<ViewStyle>;
    let bubble: StyleProp<ViewStyle>;
    let tailWrapper: StyleProp<ViewStyle>;
    let tail: StyleProp<ViewStyle>;
    let bubbleText: StyleProp<TextStyle>;
    let tailOverlay: StyleProp<ViewStyle>;

    if(type === 'sent') {
      container = {alignItems: 'flex-end'};
      bubble = {backgroundColor: colors.primary};
      tailWrapper = {right: -12};
      tail = styles.tailRight;
      tailOverlay = styles.tailOverlayRight;
      bubbleText = {color: colors.white};
    } else {
      container = {alignItems: 'flex-start'};
      bubble = {backgroundColor: colors.lightGray};
      tailWrapper = {left: -12};
      tail = styles.tailLeft;
      tailOverlay = styles.tailOverlayLeft;
    }
  
    return {
      container: [styles.container, container],
      bubble: [styles.bubble, bubble],
      tailWrapper: [styles.tailWrapper, tailWrapper],
      tail: [styles.tail, tail],
      tailOverlay: [styles.tailOverlay, tailOverlay],
      bubbleText: [bubbleText]
    }
  }, []);

  return (
    <View style={bubbleStyle.container}>
      <View style={bubbleStyle.bubble}>
        <Text style={bubbleStyle.bubbleText}>
          {message}
        </Text>
      </View>
      <View style={bubbleStyle.tailWrapper}>
        <View style={bubbleStyle.tailOverlay}></View>
        <View style={bubbleStyle.tail}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  bubble: {
    maxWidth: (Dimensions.get('screen').width / 2) + (Dimensions.get('screen').width / 6),
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 15,
    zIndex: 5
  },
  tailWrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  },
  tail: {
    width: 20,
    height: 13,
  },
  tailRight: {
    borderBottomLeftRadius: 30,
    backgroundColor: colors.primary
  },
  tailLeft: {
    borderBottomRightRadius: 30,
    backgroundColor: colors.lightGray
  },
  tailOverlay: {
    width: 30,
    height: 30,
    backgroundColor: colors.lightGray2,
    position: 'absolute',
    bottom: -1,
    zIndex: 2,
  },
  tailOverlayRight: {
    borderBottomLeftRadius: 10,
    right: -18,
  },
  tailOverlayLeft: {
    borderBottomRightRadius: 10,
    left: -18,
  }
});

export default Bubble;