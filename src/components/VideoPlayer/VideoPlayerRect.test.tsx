import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VideoPlayerRect from './VideoPlayerRect';

describe('VideoPlayerRect', () => {
  it('Рендерит div с правильными стилями', () => {
    const { container } = render(
      <VideoPlayerRect left={100} top={50} width={200} height={150} />
    );
    
    const div = container.firstChild as HTMLElement;
    expect(div.style.left).toBe('100px');
    expect(div.style.top).toBe('50px');
    expect(div.style.width).toBe('200px');
    expect(div.style.height).toBe('150px');
  });
});