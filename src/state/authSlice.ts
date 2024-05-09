import { createAction, createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IUserLoginProps, IUserProps } from "../interfaces/User";
import auth from '@react-native-firebase/auth';

interface IAuthStateProps {
  loading: boolean;
  user: IUserProps | undefined;
  error: string | undefined;
};

const initialState: IAuthStateProps = {
  loading: false,
  user: undefined,
  error: undefined
};

export const loginUser = createAsyncThunk('auth/login', async (arg: IUserLoginProps, {rejectWithValue}) => {
  if(arg.email === '' || arg.password === '') {
    return rejectWithValue('Fill up all the fields!');
  }

  let errorMessage: string | undefined;
  const user = await auth()
    .signInWithEmailAndPassword(arg.email, arg.password)
    .catch(error => {
      if(error.code === 'auth/invalid-credential') errorMessage = 'Invalid username or password!';
      if(error.code === 'auth/wrong-password') errorMessage = 'Password does not match!';
      if(error.code === 'auth/too-many-requests') errorMessage = 'You have reached the maximum login attempts. You can try logging in again later.';
    });
  
  if(errorMessage) return rejectWithValue(errorMessage);

  return {
    email: user?.user.email,
    displayName: user?.user.displayName
  };
});

export const logoutUser = createAsyncThunk('auth/logout', async (arg, {rejectWithValue}) => {
  let errorMessage: string | undefined;
  await auth()
    .signOut()
    .catch(error => {
      errorMessage = 'Something went wrong!';
    });
  
  if(errorMessage) return rejectWithValue(errorMessage);

  return undefined;
});

export const authenticateUser = createAction<IUserProps | undefined> ('auth/user');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = undefined;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(authenticateUser, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(loginUser.pending, logoutUser.pending), (state) => {
        state.loading = true;
      });
  },
  reducers: {}
});

export default authSlice.reducer;

