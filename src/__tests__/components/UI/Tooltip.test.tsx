import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from '@/components/UI/Tooltip/Tooltip';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip content="Tooltip text"><span>Hover me</span></Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip content by default', () => {
    render(<Tooltip content="Hidden tip"><span>Target</span></Tooltip>);
    expect(screen.queryByText('Hidden tip')).not.toBeInTheDocument();
  });

  it('shows tooltip content after mouseenter', () => {
    render(<Tooltip content="Visible tip"><span>Target</span></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Target').closest('span')!);
    expect(screen.getByText('Visible tip')).toBeInTheDocument();
  });

  it('hides tooltip after mouseleave', () => {
    render(<Tooltip content="Gone tip"><span>Target</span></Tooltip>);
    const trigger = screen.getByText('Target').closest('span')!;
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Gone tip')).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Gone tip')).not.toBeInTheDocument();
  });

  it('renders tooltip content in document.body (portal)', () => {
    render(<Tooltip content="Portal tip"><span>Target</span></Tooltip>);
    const trigger = screen.getByText('Target').closest('span')!;
    fireEvent.mouseEnter(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(document.body.contains(tooltip)).toBe(true);
  });
});