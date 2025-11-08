import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import phoneReducer from './phoneSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    phone: phoneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
