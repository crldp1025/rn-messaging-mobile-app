import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Bubble, { BubbleType } from '../components/common/Bubble';
import { StyleSheet, FlatList, View } from 'react-native';
import colors from '../themes/colors';
import TextInput from '../components/common/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../components/common/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../components/common/Navigation';
import firestore from '@react-native-firebase/firestore';

const conversationData = [
  {
    id: 0,
    type: 'sent',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida dolor eu felis dignissim, eget dignissim mi pellentesque. Suspendisse non sollicitudin dolor, nec sodales velit. Nam ornare, massa a hendrerit scelerisque, lectus libero imperdiet massa, scelerisque tincidunt lacus lorem vel mauris. Vivamus dapibus sapien libero, nec lacinia dolor malesuada fringilla. Suspendisse at est convallis, pellentesque nibh vel, fermentum eros. Sed in mauris ut arcu pellentesque vestibulum. Morbi vehicula a nisi vel fermentum.'
  },
  {
    id: 1,
    type: 'received',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida dolor eu felis dignissim, eget dignissim mi pellentesque. Suspendisse non sollicitudin dolor, nec sodales velit. Nam ornare, massa a hendrerit scelerisque, lectus libero imperdiet massa, scelerisque tincidunt lacus lorem vel mauris. Vivamus dapibus sapien libero, nec lacinia dolor malesuada fringilla. Suspendisse at est convallis, pellentesque nibh vel, fermentum eros. Sed in mauris ut arcu pellentesque vestibulum. Morbi vehicula a nisi vel fermentum.'
  },
  {
    id: 2,
    type: 'sent',
    message: 'Lorem ipsum dolor sit amet'
  },
]

interface IMessageProps {
  id: number;
  message: string;
  created?: string;
}

const userId = 'HigycpBDjj2j5qTCIT7X';

const ConversationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Conversation'>>();
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string>('');
  const [conversations, setConversations] = useState<{ id: number; message: any; }[]>([]);
  const chatRef = firestore().collection('Chats');

  const storeMessage = async () => {
    await chatRef.doc(route.params.conversationId).update({
      updatedAt: firestore.FieldValue.serverTimestamp(),
      viewed: false
    });

    await chatRef.doc(route.params.conversationId).collection('Messages').add({
      user: userId,
      message: message,
      createdAt: firestore.FieldValue.serverTimestamp()
    });

    setMessage('');
  }

  const handleSendMessage = () => {
    storeMessage();
  };

  const sendButtonState = useMemo(() => {
    return {
      isDisabled: (message === '') ? true : false,
      color: (message === '') ? colors.gray : colors.primary
    }
  }, [message]);

  const handleUpdateChatView = async () => {
    await chatRef.doc(route.params.conversationId).update({
      viewed: true
    });
  }

  const handleFetchConversation = async () => {
    chatRef.doc(route.params.conversationId).collection('Messages').orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      let newConversations: { id: number; type: string, message: any; }[] = [];
      let counter = 0;
      querySnapshot.forEach(documentSnapshot => {
        newConversations.push({
          id: counter,
          type: (userId === documentSnapshot.data().user) ? 'sent' : 'received',
          message: documentSnapshot.data().message
        });
        counter++;
      });
      setConversations(newConversations);
    });
  }

  useEffect(() => {
    handleUpdateChatView();
    handleFetchConversation();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={conversations}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item, index}) => (
          <Bubble key={index} type={item.type as BubbleType} message={item.message}  />
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