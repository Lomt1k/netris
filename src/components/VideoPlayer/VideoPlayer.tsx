import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { videoMarksActions } from '../../store/actions';
import { VideoMark } from '../../api/VideoMark';
import VideoPlayerMarks from './VideoPlayerMarks';
import VideoPlayerRect from './VideoPlayerRect';
import './VideoPlayer.scss';

type VideoPlayerProps = {
  videoUrl: string;
  dataUrl: string;
};

type VideoDimensions = {
  videoWidth: number;
  videoHeight: number;
  displayWidth: number;
  displayHeight: number;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl, dataUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { marks, loading, error } = useAppSelector(state => state.videoMarks);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState<VideoDimensions>({
    videoWidth: 0,
    videoHeight: 0,
    displayWidth: 0,
    displayHeight: 0
  });

  useEffect(() => {
    dispatch(videoMarksActions.fetchVideoMarksRequest(dataUrl));
  }, [dataUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const { videoWidth, videoHeight } = video;
      const { width: displayWidth, height: displayHeight } = video.getBoundingClientRect();
      setVideoDimensions({ videoWidth, videoHeight, displayWidth, displayHeight });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleResize = () => {
      if (video) {
        const { width: displayWidth, height: displayHeight } = video.getBoundingClientRect();
        setVideoDimensions(prev => ({
          ...prev,
          displayWidth,
          displayHeight
        }));
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    window.addEventListener('resize', handleResize);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMarkClick = useCallback((mark: VideoMark) => {
    if (videoRef.current) {
      videoRef.current.currentTime = mark.timestamp;
      videoRef.current.play();
      window.scrollTo({ top: 0, behavior: 'smooth', }); // для удобства
    }
  }, []);

  // Размер видео может не соответствовать оригинальному
  const scaleCoordinates = (mark: VideoMark) => {
    const { videoWidth, videoHeight, displayWidth, displayHeight } = videoDimensions;

    if (videoWidth === 0 || videoHeight === 0) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }

    const scaleX = displayWidth / videoWidth;
    const scaleY = displayHeight / videoHeight;

    return {
      left: mark.zone.left * scaleX,
      top: mark.zone.top * scaleY,
      width: mark.zone.width * scaleX,
      height: mark.zone.height * scaleY,
    };
  };

  const activeMarks = marks.filter(
    mark => currentTime >= mark.timestamp && currentTime <= mark.timestamp + mark.duration
  );

  return (
    <div className="video-player" ref={videoContainerRef}>
      <div className="video-player__container">
        <video ref={videoRef} controls width="100%" data-testid="video-player">
          <source src={videoUrl} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>

        <div className="video-player__overlay">
          {activeMarks.map((mark, index) => {
            const { left, top, width, height } = scaleCoordinates(mark);
            return <VideoPlayerRect key={`${mark.timestamp}-${index}`} left={left} top={top} width={width} height={height} />
          })}
        </div>
      </div>
      <VideoPlayerMarks marks={marks} loading={loading} error={error} onMarkClick={handleMarkClick} />
    </div>
  );
};

export default VideoPlayer;