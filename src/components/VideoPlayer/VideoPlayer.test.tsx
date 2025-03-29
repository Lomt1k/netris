import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VideoPlayer from './VideoPlayer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { videoMarksActions } from '../../store/actions';

vi.mock('../../store/hooks');
vi.mock('./VideoPlayerMarks', () => ({
  default: vi.fn(() => <div>VideoPlayerMarks</div>)
}));
vi.mock('./VideoPlayerRect', () => ({
  default: vi.fn(() => <div>VideoPlayerRect</div>)
}));

describe('VideoPlayer', () => {
  const mockProps = {
    videoUrl: 'test-video.mp4',
    dataUrl: 'test-data.json'
  };

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
  });

  it('Рендерит видео с правильным источником', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      marks: [],
      loading: false,
      error: null
    });

    render(<VideoPlayer {...mockProps} />);
    const video = screen.getByTestId('video-player') as HTMLVideoElement;
    expect(video.querySelector('source')?.getAttribute('src')).toBe('test-video.mp4');
  });

  it('Отправляет action при монтировании', () => {
    const dispatchMock = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
    
    render(<VideoPlayer {...mockProps} />);
    expect(dispatchMock).toHaveBeenCalledWith(
      videoMarksActions.fetchVideoMarksRequest(mockProps.dataUrl)
    );
  });
});