import React from 'react';
import {TextInput as RNTextInput, StyleSheet, TextInputProps} from 'react-native';
import colors from '../../themes/colors';

const TextInput = ({style, ...props}: TextInputProps) => {
  return (
    <RNTextInput 
      style={[styles.textInput, style]}
      placeholderTextColor={colors.gray}
      {...props} />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16
  }
});

export default TextInput;