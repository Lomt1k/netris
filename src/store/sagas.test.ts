import { describe, it, expect } from 'vitest';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchVideoMarksSaga, watchVideoMarks } from './sagas';
import { videoMarksActions } from './actions';
import { fetchVideoMarks } from '../api/VideoMark';
import type { VideoMark } from '../api/VideoMark';
import { mockVideoMarks } from '../api/__mocks__/videoMarks';

describe('videoMarks sagas', () => {
  describe('fetchVideoMarksSaga', () => {
    it('Успешно обрабатывает загрузку меток', () => {
      const mockMarks: VideoMark[] = [...mockVideoMarks];
      
      const action = { 
        type: videoMarksActions.fetchVideoMarksRequest.type,
        payload: 'test-url' 
      };
      
      const generator = fetchVideoMarksSaga(action);

      // Проверяем вызов API
      expect(generator.next().value).toEqual(call(fetchVideoMarks, 'test-url'));
      
      // Проверяем успешный action с отсортированными метками
      const sortedMarks = [...mockMarks].sort((a, b) => a.timestamp - b.timestamp);
      expect(generator.next(mockMarks).value).toEqual(
        put(videoMarksActions.fetchVideoMarksSuccess(sortedMarks))
      );
      
      // Проверяем завершение саги
      expect(generator.next().done).toBe(true);
    });

    it('Обрабатывает ошибку при загрузке меток', () => {
      const action = { 
        type: videoMarksActions.fetchVideoMarksRequest.type,
        payload: 'test-url' 
      };
      
      const generator = fetchVideoMarksSaga(action);
      generator.next(); // Пропускаем вызов API
      
      const error = new Error('Network error');
      expect(generator.throw(error).value).toEqual(
        put(videoMarksActions.fetchVideoMarksFailure('Network error'))
      );
      
      expect(generator.next().done).toBe(true);
    });
  });

  describe('watchVideoMarks', () => {
    it('Должен запускать сагу при соответствующем action', () => {
      const generator = watchVideoMarks();
      
      expect(generator.next().value).toEqual(
        takeLatest(videoMarksActions.fetchVideoMarksRequest.type, fetchVideoMarksSaga)
      );
    });
  });
});