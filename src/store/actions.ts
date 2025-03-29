import { createAction } from '@reduxjs/toolkit';
import { VideoMark } from '../api/VideoMark';

export const fetchVideoMarksRequest = createAction<string>('videoMarks/fetchRequest');
export const fetchVideoMarksSuccess = createAction<VideoMark[]>('videoMarks/fetchSuccess');
export const fetchVideoMarksFailure = createAction<string>('videoMarks/fetchFailure');

export const videoMarksActions = {
  fetchVideoMarksRequest,
  fetchVideoMarksSuccess,
  fetchVideoMarksFailure,
}