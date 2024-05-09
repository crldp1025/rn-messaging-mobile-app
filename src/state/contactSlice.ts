import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IContactProps, IUserProps } from "../interfaces/User";
import firestore from '@react-native-firebase/firestore';

interface IContactStateProps {
  loading: boolean;
  contacts: IUserProps[];
  error: string | undefined;
};

const initialState: IContactStateProps = {
  loading: false,
  contacts: [],
  error: undefined
};

export const getAllContacts = createAsyncThunk('contacts/get', async (arg: string, {rejectWithValue}) => {
  const contactsRef = firestore().collection('Contacts');
  const chatsRef = firestore().collection('Chats');

  const contacts = await new Promise((resolve) => {
    contactsRef
    .where('userId', '==', arg)
    .onSnapshot(async (contactsSnapshot) => {
      let userContacts: IUserProps[] = [];
      if(contactsSnapshot.size > 0) {
        await Promise.all(contactsSnapshot.docs[0].data().contacts.map(async (item: string) => {
          await new Promise(async resolve => {
            const user = await firestore().collection('Users').doc(item).get();
            if(user.exists && user.data()) {
              userContacts.push({
                id: user.id,
                email: user.data()?.email,
                displayName: user.data()?.displayName
              });
            }
            resolve(true);
          });
        }));
      }
      
      resolve(userContacts);
    });
  }).catch(error => {
    return undefined;
  });

  if(!contacts) {
    return rejectWithValue('Something went wrong!')
  }

  return contacts;
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload as IUserProps[];
        state.error = undefined;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
  reducers: {}
});

export default contactSlice.reducer;