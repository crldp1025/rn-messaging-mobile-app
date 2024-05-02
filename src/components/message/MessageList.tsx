import React, { useState } from 'react';
import Text from '../common/Text';
import { FlatList, StyleSheet, View } from 'react-native';
import { messages } from '../../constants/Message';
import MessageListItem from './MessageListItem';
import colors from '../../themes/colors';
import TextInput from '../common/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../common/Icon';
import Search from '../common/Search';

const MessageHeader = () => {
  const [searchMessage, setSearchMessage] = useState<string>('');

  return (
    <Search 
      value={searchMessage}
      handleSearch={value => setSearchMessage(value)} />
  );
};

const MessageList = () => {
  
  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={MessageHeader}
        renderItem={({item, index}) => <MessageListItem key={index} data={item} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: 1,
    backgroundColor: colors.lightGray2
  }
});

export default MessageList;