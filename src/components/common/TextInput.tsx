import React from 'react';
import {TextInput as RNTextInput, StyleSheet, TextInputProps} from 'react-native';

const TextInput = ({style, ...props}: TextInputProps) => {
  return (
    <RNTextInput 
      style={[styles.textInput, style]}
      {...props} />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'OpenSans-Regular'
  }
});

export default TextInput;