import React, { useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Avatar from '../common/Avatar';
import Text from '../common/Text';
import { IChatProps } from '../../interfaces/Chat';
import Icon from '../common/Icon';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../tools/hooks';

interface IChatListItemProps {
  data: IChatProps;
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

const ChatListItem = ({data}: IChatListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {user} = useAppSelector((state) => state.auth);

  const date = useMemo(() => {
    let resTime = '';
    if(data.updatedAt !== null) {
      const updatedAt = new Date(data.updatedAt!.toDate());
      const today = new Date();
  
      if(today.getFullYear() == updatedAt.getFullYear()) {
        if(today.toDateString() == updatedAt.toDateString()) {
          resTime = updatedAt.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true });
        } else {
          resTime = updatedAt.toLocaleString('en-US', {month: '2-digit', day: '2-digit'});
        }
      } else {
        resTime = updatedAt.toLocaleString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'});
      }
    }

    return resTime;
  }, [data]);
  
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={50}
      overshootRight={false}>
      <RectButton 
        style={styles.container} 
        onPress={() => navigation.navigate('Conversation', {conversationId: data.id, data: data.user})}>
        <View style={{width: 50, height: 50}}>
          <Avatar 
            name={data.user!.displayName}
            url={data.user?.avatar} />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}> 
              {data.user!.displayName}
            </Text>
            <Text style={styles.time}>{date}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text 
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[styles.message]}>
              {data.latestMessage?.message}
            </Text>
            {(!data.isViewed && data.latestMessage?.userId !== user?.id) &&
              <View 
                style={{
                  width: 10, 
                  height: 10, 
                  backgroundColor: colors.red, 
                  borderRadius: 10
                }}></View>
            }
          </View>
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
    flex: 1,
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

export default ChatListItem;