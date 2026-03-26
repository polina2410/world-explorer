import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

function Fixture({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);
  return (
    <div>
      <button id="outside">Outside</button>
      <div ref={ref}>
        <button id="first">First</button>
        <button id="second">Second</button>
        <button id="last">Last</button>
      </div>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('focuses the first focusable element when activated', () => {
    render(<Fixture active={true} />);
    expect(document.activeElement).toBe(screen.getByText('First'));
  });

  it('does not move focus when inactive', () => {
    render(<Fixture active={false} />);
    expect(document.activeElement).not.toBe(screen.getByText('First'));
  });

  it('wraps Tab from last element back to first', () => {
    render(<Fixture active={true} />);
    screen.getByText('Last').focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(screen.getByText('First'));
  });

  it('wraps Shift+Tab from first element back to last', () => {
    render(<Fixture active={true} />);
    screen.getByText('First').focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(screen.getByText('Last'));
  });

  it('does not interfere with Tab between middle elements', () => {
    render(<Fixture active={true} />);
    screen.getByText('First').focus();
    const prevented = vi.fn();
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    event.preventDefault = prevented;
    document.dispatchEvent(event);
    expect(prevented).not.toHaveBeenCalled();
  });

  it('restores focus to the previously focused element on cleanup', () => {
    const { rerender } = render(<Fixture active={false} />);
    screen.getByText('Outside').focus();
    rerender(<Fixture active={true} />);
    rerender(<Fixture active={false} />);
    expect(document.activeElement).toBe(screen.getByText('Outside'));
  });
});