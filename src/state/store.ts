import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import authReducer from './authSlice';
import contactReducer from './contactSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    contacts: contactReducer,
    chats: chatReducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;