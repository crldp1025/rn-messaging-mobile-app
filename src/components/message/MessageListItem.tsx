import React from 'react';
import Text from '../common/Text';
import { IMessageProps } from '../../interfaces/Message';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../../themes/colors';
import Icon from '../common/Icon';
import Avatar from '../common/Avatar';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IMessageListdataProps {
  data: IMessageProps;
}

const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
  return (
    <RectButton 
      style={[
        styles.rightButton, 
        { backgroundColor: colors.red }
      ]}
      onPress={() => console.log()}>
      <Icon type="material-community" name="delete" size={30} color={colors.white} />
    </RectButton>
  );
};

const MessageListdata = ({data}: IMessageListdataProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={50}
      overshootRight={false}>
      <RectButton 
        style={styles.container} 
        onPress={() => navigation.navigate('Conversation', {data: data.user})}>
        <View style={{width: 50, height: 50}}>
          <Avatar 
            name={`${data.user.firstName} ${data.user.lastName}`}
            url={data.user.avatar} />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}> 
              {`${data.user.firstName} ${data.user.lastName}`}
            </Text>
            <Text style={styles.time}>9:00pm</Text>
          </View>
          <Text 
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.message}>
            {data.recentMessage}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: 10
  },
  avatarWrapper: {
    width: 50,
    height: 50
  },
  title: {
    flex: 1,
    fontWeight: '600'
  },
  message: {
    fontSize: 14,
    color: colors.darkGray
  },
  time: {
    fontSize: 13,
    color: colors.darkGray
  },
  rightButton: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default MessageListdata;