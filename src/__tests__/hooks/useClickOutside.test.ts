import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { fireEvent } from '@testing-library/react';

describe('useClickOutside', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onClose when clicking outside (no ref)', () => {
    const onClose = vi.fn();
    renderHook(() => useClickOutside(onClose));

    fireEvent.mouseDown(document);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the ref element', () => {
    const onClose = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref = { current: div };

    renderHook(() => useClickOutside(onClose, { ref }));

    fireEvent.mouseDown(div);
    expect(onClose).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it('calls onClose when clicking outside the ref element', () => {
    const onClose = vi.fn();
    const inner = document.createElement('div');
    const outer = document.createElement('div');
    document.body.appendChild(inner);
    document.body.appendChild(outer);
    const ref = { current: inner };

    renderHook(() => useClickOutside(onClose, { ref }));

    fireEvent.mouseDown(outer);
    expect(onClose).toHaveBeenCalledTimes(1);

    document.body.removeChild(inner);
    document.body.removeChild(outer);
  });

  it('calls onClose on Escape key when escape=true', () => {
    const onClose = vi.fn();
    renderHook(() => useClickOutside(onClose, { escape: true }));

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape key when escape=false', () => {
    const onClose = vi.fn();
    renderHook(() => useClickOutside(onClose, { escape: false }));

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose on non-Escape key press', () => {
    const onClose = vi.fn();
    renderHook(() => useClickOutside(onClose, { escape: true }));

    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
    const onClose = vi.fn();
    const { unmount } = renderHook(() => useClickOutside(onClose));

    unmount();
    fireEvent.mouseDown(document);
    expect(onClose).not.toHaveBeenCalled();
  });
});
