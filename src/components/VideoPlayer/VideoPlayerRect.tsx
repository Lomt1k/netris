import { FC, memo } from 'react';
import './VideoPlayerRect.scss';

type VideoPlayerRectProps = {
  left: number;
  top: number;
  width: number;
  height: number;
}

const VideoPlayerRect: FC<VideoPlayerRectProps> = ({ left, top, width, height }) => {
  return (
    <div
      className="video-player-rect"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}

export default memo(VideoPlayerRect);