/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Survey } from '../types';

interface StateProps {
  isLoading: boolean;
  survey: Survey;
}

const initialState: StateProps = {
  isLoading: false,
  survey: {},
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    toggleIsLoading(state, action: PayloadAction<boolean | undefined>) {
      state.isLoading = typeof action.payload === 'undefined' ? !state.isLoading : action.payload;
    },
  },
});

export const { toggleIsLoading } = surveySlice.actions;
export default surveySlice.reducer;
