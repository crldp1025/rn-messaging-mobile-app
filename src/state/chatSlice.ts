import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IChatProps, IMessageProps, ISendChatProps } from "../interfaces/Chat";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IUserProps } from "../interfaces/User";

interface IChatStateProps {
  loading: boolean;
  chats: IChatProps[];
  error: string | undefined;
};

const initialState: IChatStateProps = {
  loading: false,
  chats: [],
  error: undefined
};

export const sendChat = createAsyncThunk('chats/send', async (arg: ISendChatProps) => {
  const chatsRef = firestore().collection('Chats');
  let chatId: string | undefined = undefined;

  if(!arg.chatId) {
    const chat = await chatsRef.add({
      users: [arg.receiverId, arg.message.userId],
      updatedAt: firestore.FieldValue.serverTimestamp(),
      viewed: false
    });
    chatId = chat.id;
  } else {
    chatId = arg.chatId;
    await chatsRef.doc(arg.chatId).update({
      updatedAt: firestore.FieldValue.serverTimestamp(),
      viewed: false
    });
  }

  await chatsRef.doc(chatId).collection('Messages').add({
    userId: arg.message.userId,
    message: arg.message.message,
    createdAt: firestore.FieldValue.serverTimestamp()
  });

  return 'Success';
});

interface IGetAllChatsProps {
  authUserId: string;
  chatSnapshot: FirebaseFirestoreTypes.QuerySnapshot;
}

export const getAllChats = createAsyncThunk('chats/get', async (args: IGetAllChatsProps) => {
  const chatsRef = firestore().collection('Chats');
  const userRef = firestore().collection('Users');
  let chatDocuments: IChatProps[] = [];
  
  if(args.chatSnapshot.size > 0) {
    args.chatSnapshot.docs.map(async (item) => {
      chatDocuments.push({
        id: item.id,
        updatedAt: item.data().updatedAt,
        isViewed: item.data().viewed,
        users: item.data().users
      });
    });
  }

  await Promise.all(chatDocuments.map(async (item) => {
    const userId = item.users?.filter(id => id !== args.authUserId)[0];
    const user = await userRef.doc(userId).get();
    if(user.exists) {
      item.user = {
        id: user.id,
        displayName: user.data()?.displayName,
        email: user.data()?.email
      }
    }
    
    const latestMessage = await chatsRef.doc(item.id).collection('Messages').orderBy('createdAt', 'desc').limit(1).get();
    if(latestMessage.size > 0) item.latestMessage = latestMessage.docs[0].data() as IMessageProps;
  }));

  return chatDocuments;
});

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
        state.error = undefined;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChat.fulfilled, (state) => {
        state.loading = false;
        state.error = undefined;
      })
      .addCase(sendChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
  reducers: {}
});

export default chatSlice.reducer;
