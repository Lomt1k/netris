import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { videoMarksActions } from '../../store/actions';
import { formatSecondsToMMSSsss } from '../../utils/Time';
import './VideoPlayer.scss';

type VideoPlayerProps = {
  videoUrl: string;
  dataUrl: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, dataUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const { marks, loading, error } = useAppSelector(state => state.videoMarks);

  useEffect(() => {
    dispatch(videoMarksActions.fetchVideoMarksRequest(dataUrl));
  }, [dataUrl]);

  return (
    <div className="video-player">
      <video ref={videoRef} controls width="100%">
        <source src={videoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <div className="video-player__marks">
        {loading && <span className='video-player__loading'>Загрузка меток...</span>}
        {error && <span className='video-player__error'>{error}</span>}
        <ul className="video-player__marks-list">
          {marks.map(mark => (
            <li key={mark.timestamp}>
              {formatSecondsToMMSSsss(mark.timestamp)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default VideoPlayer;