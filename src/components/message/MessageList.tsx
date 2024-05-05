import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MessageListItem from './MessageListItem';
import colors from '../../themes/colors';
import Search from '../common/Search';
import firestore from '@react-native-firebase/firestore';
import { IMessageProps } from '../../interfaces/Message';

const MessageHeader = () => {
  const [searchMessage, setSearchMessage] = useState<string>('');

  return (
    <Search 
      value={searchMessage}
      handleSearch={value => setSearchMessage(value)} />
  );
};

const myId = 'HigycpBDjj2j5qTCIT7X';

const MessageList = () => {
  const chatRef = firestore().collection('Chats');
  const [messages, setMessages] = useState<IMessageProps[]>([]);

  const handleFetchData = async () => {
    chatRef.where('users', 'array-contains-any', [myId]).onSnapshot(async chatList => {
      let messagesData: IMessageProps[] = [];
      new Promise((resolve) => {
        chatList.forEach(async (chatItem) => {
          try {
            const userId = chatItem.data().users.filter((id: string) => id !== myId)[0];
            const user = await firestore().collection('Users').doc(userId).get();
            if(user.exists) {
              const latestMessage = await chatRef.doc(chatItem.id).collection('Messages').orderBy('createdAt', 'desc').limit(1).get();
              if(!latestMessage.empty && chatItem.data().updatedAt !== null) {
                messagesData.push({
                  id: chatItem.id,
                  user: {
                    id: userId,
                    email: user.data()?.email,
                    displayName: user.data()?.displayName
                  },
                  message: latestMessage.docs[0].data().message,
                  updatedAt: new Date(chatItem.data().updatedAt.toDate()).toDateString(),
                  isViewed: (latestMessage.docs[0].data().user !== myId) ? chatItem.data().viewed : true
                });
              }
            }
            resolve(true);
          } catch (error) {
            console.log('ERROR', error)
          }
        });
      }).then(() => {
        setMessages(messagesData);
      })
    });
  }
  

  React.useEffect(() => {
    handleFetchData();

    return () => setMessages([]);
  }, []);
  
  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
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