import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Alphabet from '@/components/features/CountriesPage/Alphabet/Alphabet';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

describe('Alphabet', () => {
  it('renders all 26 letters', () => {
    render(<Alphabet />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(26);
  });

  it('renders A through Z', () => {
    render(<Alphabet />);
    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Z' })).toBeInTheDocument();
  });

  it('calls onSelectAction with letter when clicked', () => {
    const onSelectAction = vi.fn();
    render(<Alphabet onSelectAction={onSelectAction} />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    expect(onSelectAction).toHaveBeenCalledWith('F');
  });

  it('clicking the same letter again calls onSelectAction with null (toggle)', () => {
    const onSelectAction = vi.fn();
    render(<Alphabet onSelectAction={onSelectAction} />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    expect(onSelectAction).toHaveBeenLastCalledWith(null);
  });

  it('clicking a different letter switches the active letter', () => {
    const onSelectAction = vi.fn();
    render(<Alphabet onSelectAction={onSelectAction} />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    fireEvent.click(screen.getByRole('button', { name: 'G' }));
    expect(onSelectAction).toHaveBeenLastCalledWith('G');
  });

  it('sets aria-pressed=true on the active letter', () => {
    render(<Alphabet />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    expect(screen.getByRole('button', { name: 'F' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('sets aria-pressed=false on inactive letters', () => {
    render(<Alphabet />);
    fireEvent.click(screen.getByRole('button', { name: 'F' }));
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('Enter key selects a letter', () => {
    const onSelectAction = vi.fn();
    render(<Alphabet onSelectAction={onSelectAction} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'M' }), {
      key: 'Enter',
    });
    expect(onSelectAction).toHaveBeenCalledWith('M');
  });

  it('Space key selects a letter', () => {
    const onSelectAction = vi.fn();
    render(<Alphabet onSelectAction={onSelectAction} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'M' }), { key: ' ' });
    expect(onSelectAction).toHaveBeenCalledWith('M');
  });

  it('other keys do not trigger selection', () => {
    const onSelectAction = vi.fn();
    render(<Alphabet onSelectAction={onSelectAction} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'M' }), {
      key: 'Tab',
    });
    expect(onSelectAction).not.toHaveBeenCalled();
  });
});
