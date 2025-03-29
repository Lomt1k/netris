import { FC, memo } from "react";
import { VideoMark } from "../../api/VideoMark";
import { formatSecondsToMMSSsss } from "../../utils/Time";
import TextButton from "../TextButton/TextButton";
import './VideoPlayerMarks.scss';

type VideoPlayerMarksProps = {
  marks: VideoMark[];
  loading: boolean;
  error: string | null;
  onMarkClick: (mark: VideoMark) => void;
}

const VideoPlayerMarks: FC<VideoPlayerMarksProps> = ({ marks, loading, error, onMarkClick }) => {
  return (
    <div className="video-player-marks">
      {loading && <span className="video-player-marks__loading">Загрузка меток...</span>}
      {error && <span className="video-player-marks__error">{error}</span>}
      <ul className="video-player-marks__list">
        {marks.map(mark => (
          <li key={mark.timestamp}>
            <TextButton onClick={() => onMarkClick(mark)}>
              {formatSecondsToMMSSsss(mark.timestamp)}
            </TextButton>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(VideoPlayerMarks);