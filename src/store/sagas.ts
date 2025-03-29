import { call, put, takeLatest, all } from 'redux-saga/effects';
import { fetchVideoMarks, VideoMark } from '../api/VideoMark';
import { videoMarksActions } from './actions';
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchVideoMarksSaga(action: PayloadAction<string>) {
  try {
    const marks: VideoMark[] = yield call(fetchVideoMarks, action.payload);
    const sortedMarks = [...marks].sort((a, b) => a.timestamp - b.timestamp);
    yield put(videoMarksActions.fetchVideoMarksSuccess(sortedMarks));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    yield put(videoMarksActions.fetchVideoMarksFailure(errorMessage));
  }
}

export function* watchVideoMarks() {
  yield takeLatest(videoMarksActions.fetchVideoMarksRequest.type, fetchVideoMarksSaga);
}

export default function* rootSaga() {
  yield all([
    watchVideoMarks()
  ])
}