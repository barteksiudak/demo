import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from './surveySlice';

export const store = configureStore({
  reducer: {
    survey: surveyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
