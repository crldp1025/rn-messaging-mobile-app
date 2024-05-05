import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import Search from '../common/Search';
import ChatListItem from './ChatListItem';
import firestore from '@react-native-firebase/firestore';

const MessageHeader = () => {
  const [searchMessage, setSearchMessage] = useState<string>('');

  return (
    <Search 
      value={searchMessage}
      handleSearch={value => setSearchMessage(value)} />
  );
};

const ChatList = () => {
  const userRef = firestore().collection('Users');
  const chatRef = firestore().collection('Chats');

  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={MessageHeader}
      renderItem={({item, index}) => <ChatListItem key={index} data={item} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
    />
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: 1,
    backgroundColor: colors.lightGray2
  }
});

export default ChatList;