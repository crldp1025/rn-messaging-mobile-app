import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IContactProps, IUserProps } from "../interfaces/User";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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

export const getAllContacts = createAsyncThunk('contacts/get', async (contactSnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
  const contactsRef = firestore().collection('Contacts');
  const usersRef = firestore().collection('Users');
  let contacts: IUserProps[] = [];

  if(!contactSnapshot.empty && contactSnapshot.size > 0) {
    const userContacts = await contactsRef.doc(contactSnapshot.docs[0].id).collection('Users').get();
    if(!userContacts.empty && userContacts.size > 0) {
      userContacts.docs.map(item => {
        contacts.push({id: item.data().userId});
      });

      await Promise.all(contacts.map(async item => {
        const user = await usersRef.doc(item.id).get();
        if(user.exists) {
          item.email = user.data()?.email;
          item.displayName = user.data()?.displayName;
        }
      }));
    }
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
        state.contacts = action.payload;
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