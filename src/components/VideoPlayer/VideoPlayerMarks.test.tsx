import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VideoPlayerMarks from './VideoPlayerMarks';
import { mockVideoMarks } from '../../api/__mocks__/videoMarks';

describe('VideoPlayerMarks', () => {
  const mockOnClick = vi.fn();

  it('Отображает список меток', () => {
    render(
      <VideoPlayerMarks 
        marks={mockVideoMarks}
        loading={false}
        error={null}
        onMarkClick={mockOnClick}
      />
    );
    
    expect(screen.getAllByRole('listitem')).toHaveLength(mockVideoMarks.length);
  });

  it('Отображает состояние загрузки', () => {
    render(
      <VideoPlayerMarks
        marks={[]}
        loading={true}
        error={null}
        onMarkClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('Загрузка меток...')).toBeInTheDocument();
  });

  it('Отображает информацию об ошибке', () => {
    render(
      <VideoPlayerMarks
        marks={[]}
        loading={false}
        error='Not Found'
        onMarkClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('Вызывает обработчик при клике на метку', () => {
    render(
      <VideoPlayerMarks
        marks={mockVideoMarks}
        loading={false}
        error={null}
        onMarkClick={mockOnClick}
      />
    );
    
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockOnClick).toHaveBeenCalledWith(mockVideoMarks[0]);
  });
});