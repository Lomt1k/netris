import { VideoMark } from '../api/VideoMark';
import { store } from './store';

export interface VideoMarksState {
  marks: VideoMark[];
  loading: boolean;
  error: string | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;