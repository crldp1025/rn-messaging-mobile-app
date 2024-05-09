import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Bubble from '../components/common/Bubble';
import { StyleSheet, FlatList, View } from 'react-native';
import colors from '../themes/colors';
import TextInput from '../components/common/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../components/common/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../components/common/Navigation';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useAppDispatch, useAppSelector } from '../tools/hooks';
import { sendChat } from '../state/chatSlice';
import { IChatProps, ISendChatProps } from '../interfaces/Chat';


const ConversationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Conversation'>>();
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string>('');
  const [conversations, setConversations] = useState<IChatProps>({messages: []});
  const chatsRef = firestore().collection('Chats');
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSendMessage = () => {
    const sendChatArg: ISendChatProps = {
      chatId: (conversations?.id) ? conversations.id : undefined,
      receiverId: conversations?.user!.id as string,
      message: {
        userId: user?.id as string,
        message: message,
      }
    };
    dispatch(sendChat(sendChatArg));
    setMessage('');
  };

  const sendButtonState = useMemo(() => {
    return {
      isDisabled: (message === '') ? true : false,
      color: (message === '') ? colors.gray : colors.primary
    }
  }, [message]);

  const handleChatsListener = () => {
    chatsRef
    .where('users', 'array-contains', user?.id)
    .onSnapshot(async chatSnapshot => {
      if(chatSnapshot.size > 0) {
        const userChatFilter = chatSnapshot.docs.filter(item => item.data().users.includes(route.params.data.id));
        const userChat: FirebaseFirestoreTypes.DocumentData = userChatFilter[0];
        if(userChat) {
          const chatId = userChat.id;
          const receiver = route.params.data;
          const messagesData = await chatsRef.doc(chatId).collection('Messages').orderBy('createdAt', 'desc').get();
          setConversations({
            id: chatId,
            user: receiver,
            messages: messagesData.docs,
            updatedAt: chatSnapshot.docs[0].data().updatedAt,
            isViewed: chatSnapshot.docs[0].data().viewed
          });
        } else {
          setConversations({...conversations, user: route.params.data});
        }
      } else {
        setConversations({...conversations, user: route.params.data});
      }
    });
  }

  useEffect(() => {
    handleChatsListener();

    return handleChatsListener();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={conversations?.messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <Bubble 
            key={index}
            type={(item.data().userId === user?.id) ? 'sent' : 'received'}
            message={item.data().message}  />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
        inverted={true}
        ListHeaderComponent={() => <View style={styles.verticalSpace}></View>}
        ListFooterComponent={() => <View style={styles.verticalSpace}></View>}
        style={styles.listContainer}
      />
      <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity>
          <Icon type='font-awesome' name='camera' size={22} color={colors.gray} />
        </TouchableOpacity>
        <View 
          style={styles.textInputWrapper}>
          <TextInput 
            style={styles.textInput}
            placeholder='Message'
            value={message}
            onChangeText={text => setMessage(text)}
            multiline={true} />
        </View>
        <TouchableOpacity
          disabled={sendButtonState.isDisabled}
          onPress={() => handleSendMessage()}>
          <Icon type='ionicon' name='send' size={25} color={sendButtonState.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray2,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  itemSeparator: {
    height: 15
  },
  verticalSpace: {
    height: 10
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    shadowColor: colors.gray,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textInputWrapper: {
    flex: 1,
    backgroundColor: colors.lightGray2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  textInput: {
    paddingVertical: 0,
    maxHeight: 100
  }
});

export default ConversationScreen;