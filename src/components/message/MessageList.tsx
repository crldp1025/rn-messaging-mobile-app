import React from 'react';
import Text from '../common/Text';
import { FlatList, View } from 'react-native';
import { messages } from '../../constants/Message';
import MessageListItem from './MessageListItem';
import colors from '../../themes/colors';

const MessageList = () => {
  return (
    <>
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item, index}) => (
        <MessageListItem key={index} data={item} />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: colors.lightGray
          }}></View>
      )}
    />
    </>
  );
};

export default MessageList;