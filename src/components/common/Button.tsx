import React, { ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import colors from '../../themes/colors';
import Text from './Text';
import { ViewStyle } from 'react-native';

type ButtonType = 'solid' | 'outline' | 'clear';
type ButtonTextAlign = 'left' | 'center' | 'right';

interface IButtonProps extends TouchableOpacityProps {
  type?: ButtonType;
  color?: string;
  align?: ButtonTextAlign;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const buttonBorderWidth = 3;

const Button = ({
  type = 'solid', 
  color = colors.primary,
  align = 'center',
  leftIcon,
  rightIcon,
  children, 
  style, 
  ...props
}: IButtonProps) => {

  const buttonStyles = useMemo(() => {
    let button: StyleProp<ViewStyle>;
    let text: StyleProp<TextStyle>;

    if(type === 'solid') {
      button = {
        backgroundColor: color,
        borderWidth: buttonBorderWidth,
        borderColor: color
      };

      text = {
        color: colors.white,
        textAlign: align
      }
    } else if(type === 'outline') {
      button = {
        backgroundColor: 'transparent',
        borderBottomWidth: buttonBorderWidth,
        borderColor: color
      };

      text = {
        color: color,
        textAlign: align
      }
    } else {
      button = {
        backgroundColor: 'transparent',
      };

      text = {
        color: color,
        textAlign: align
      }
    }

    return {
      button: [styles.button, button, style],
      text: [styles.text, text]
    };
  }, [type, color, style, align]);

  return (
    <TouchableOpacity
      style={buttonStyles.button}
      {...props}>
      {leftIcon && 
        <View style={styles.leftIconWrapper}>
          {leftIcon}
        </View>
      }
      <Text style={buttonStyles.text}>{children}</Text>
      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  text: {
    textAlign: 'center',
     flex: 1
  },
  leftIconWrapper: {
    width: 30
  }
})

export default Button;