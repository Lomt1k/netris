import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TextButton from './TextButton';

describe('TextButton', () => {
  it('Рендерит кнопку с переданным текстом', () => {
    const buttonText = 'Click me';
    render(<TextButton>{buttonText}</TextButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('Вызывает onClick при клике', () => {
    const handleClick = vi.fn();
    render(<TextButton onClick={handleClick}>Button</TextButton>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});