import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import colors from '../../themes/colors';

interface IContainerProps extends ViewProps {}

const Container = ({children, style, ...props}: IContainerProps) => {
  return (
    <View
      style={[styles.container, style]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});

export default Container;