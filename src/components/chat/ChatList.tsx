import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import Search from '../common/Search';
import ChatListItem from './ChatListItem';
import { useAppSelector } from '../../tools/hooks';
import { IChatProps } from '../../interfaces/Chat';
import { FlatList } from 'react-native-gesture-handler';

const ChatList = () => {
  const [chatList, setChatList] = useState<IChatProps[]>([]);
  const {chats} = useAppSelector((state) => state.chats);

  const MessageHeader = () => {
    const [searchMessage, setSearchMessage] = useState<string>('');

    useEffect(() => {
      const debounceSearch = setTimeout(() => {
        console.log(searchMessage)
      }, 1000);

      return () => clearTimeout(debounceSearch);
    }, [searchMessage]);
  
    return (
      <Search 
        value={searchMessage}
        handleSearch={value => setSearchMessage(value)} />
    );
  };

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  return (
    <FlatList
      data={chatList}
      keyExtractor={(item, index) => item.id as string}
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