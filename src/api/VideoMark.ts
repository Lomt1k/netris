/*
  Тут намеренно не используются библиотеки вроде zod и axios
  Пример проекта с использованием zod, axios, tanstack-query:
  https://github.com/Lomt1k/marusya
*/

export interface VideoMark {
  timestamp: number;
  duration: number;
  zone: VideoMarkZone;
}

export interface VideoMarkZone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const isVideoMarkArray = (obj: unknown): obj is VideoMark[] => {
  return Array.isArray(obj) && (obj.length < 1 || obj.every(e => isVideoMark(e)));
}

export const isVideoMark = (obj: unknown): obj is VideoMark => {
  return typeof obj === 'object' && obj != null
    && 'timestamp' in obj && typeof obj.timestamp === 'number'
    && 'duration' in obj && typeof obj.duration === 'number'
    && 'zone' in obj && isVideoMarkZone(obj.zone);
}

export const isVideoMarkZone = (obj: unknown): obj is VideoMarkZone => {
  return typeof obj === 'object' && obj != null
    && 'left' in obj && typeof obj.left === 'number'
    && 'top' in obj && typeof obj.top === 'number'
    && 'width' in obj && typeof obj.width === 'number'
    && 'height' in obj && typeof obj.height === 'number';
}

export const fetchVideoMarks = async (url: string): Promise<VideoMark[]> => {
  const response = await fetch(url);
  const data = await response.json();
  if (isVideoMarkArray(data)) {
    return data;
  }
  throw new Error('С сервера пришли некорректные данные');
}