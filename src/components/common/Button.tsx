import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IButtonProps extends TouchableOpacityProps {}

const Button = ({children, style, ...props}: IButtonProps) => {
  return (
    <TouchableOpacity>
      {children}
    </TouchableOpacity>
  );
};

export default Button;