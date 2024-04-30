import React from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export type IconTypeProps = "antdesign" | "entypo" | "evilicon" | "feather" | "font-awesome" | 
  "font-awesome-5" | "fontisto" | "foundation" | "ionicon" | "material-community" | 
  "material" | "octicon" | "simple-line-icon" | "zocial";

interface IIconProps extends IconProps {
  type?: IconTypeProps;
}

const iconData = {
  "antdesign": AntDesign,
  "entypo": Entypo,
  "evilicon": EvilIcon,
  "feather": Feather,
  "font-awesome": FontAwesome,
  "font-awesome-5": FontAwesome5,
  "fontisto": Fontisto,
  "foundation": Foundation,
  "ionicon": Ionicon,
  "material-community": MCIcon,
  "material": MaterialIcon,
  "octicon": Octicon,
  "simple-line-icon": SimpleLineIcon,
  "zocial": Zocial
}

const Icon = ({type = "feather", ...props}: IIconProps) => {
  const Component = iconData[type as keyof typeof iconData];

  return <Component {...props} />;
};

export default Icon;