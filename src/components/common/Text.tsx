import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

const Text = ({children, style, ...props}: TextProps) => {
  return (
    <RNText
      style={[styles.text, style]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  }
});

export default Text;