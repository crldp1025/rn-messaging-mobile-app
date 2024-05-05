import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;