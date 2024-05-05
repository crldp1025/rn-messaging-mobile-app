import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserRegistrationProps } from "../interfaces/User";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface IRegistrationStateProps {
  loading: boolean;
  user?: IUserRegistrationProps;
  success: string | undefined
  error: string | undefined;
};

const initialState: IRegistrationStateProps = {
  loading: false,
  user: {
    email: '',
    password: '',
    retypePassword: '',
    displayName: ''
  },
  success: undefined,
  error: undefined
};

export const registerUser = createAsyncThunk('registration/user', async (arg: IUserRegistrationProps, {rejectWithValue}) => {
  const userRef = firestore().collection('Users');

  if(arg.email === '' || 
    arg.password === '' || 
    arg.retypePassword === '' || 
    arg.displayName === '') {
      return rejectWithValue('Fill up all the required fields!')
  }

  if(arg.password !== arg.retypePassword) {
    return rejectWithValue('Password does not match!');
  }

  await auth()
    .createUserWithEmailAndPassword(arg.email, arg.password)
    .then(async ({user}) => {
      await user.updateProfile({displayName: arg.displayName});
      await userRef.add({
        email: arg.email,
        displayName: arg.displayName
      });
    })
    .catch(error => {
      if(error.code === 'auth/email-already-in-use') return rejectWithValue('Email address is already in use!');
      if(error.code === 'auth/invalid-email') return rejectWithValue('Email address is invalid!');
    });

  return 'You have successfully created your account!';
});

export const resetRegistrationState = createAction('registration/reset');

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload as string;
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = undefined;
        state.error = action.payload as string;
      })
      .addCase(resetRegistrationState, () => initialState);
  },
  reducers: {}
});

export default registrationSlice.reducer;