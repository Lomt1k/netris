import { createReducer } from '@reduxjs/toolkit';
import { VideoMarksState } from './types';
import { videoMarksActions } from './actions';

const initialState: VideoMarksState = {
  marks: [],
  loading: false,
  error: null,
}

export const videoMarksReducer = createReducer(initialState, (builder) => builder
  .addCase(videoMarksActions.fetchVideoMarksRequest, (state) => {
    state.loading = true
    state.error = null
  })
  .addCase(videoMarksActions.fetchVideoMarksSuccess, (state, action) => {
    state.marks = action.payload
    state.loading = false
  })
  .addCase(videoMarksActions.fetchVideoMarksFailure, (state, action) => {
    state.error = action.payload
    state.loading = false
  })
);

export const rootReducer = {
  videoMarks: videoMarksReducer,
}