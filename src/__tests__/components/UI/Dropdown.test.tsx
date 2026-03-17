import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '@/components/UI/Dropdown/Dropdown';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const defaultProps = {
  value: '',
  options: ['Europe', 'Asia', 'Africa'],
  onChangeAction: vi.fn(),
};

describe('Dropdown', () => {
  it('renders the placeholder when no value is selected', () => {
    render(<Dropdown {...defaultProps} placeholder="Select continent" />);
    expect(screen.getByText('Select continent')).toBeInTheDocument();
  });

  it('renders the current value when set', () => {
    render(<Dropdown {...defaultProps} value="Europe" />);
    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('opens on click and shows options', () => {
    render(<Dropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole('combobox').querySelector('div')!);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
  });

  it('calls onChangeAction when an option is clicked', () => {
    const onChangeAction = vi.fn();
    render(<Dropdown {...defaultProps} onChangeAction={onChangeAction} />);
    fireEvent.click(screen.getByRole('combobox').querySelector('div')!);
    fireEvent.click(screen.getByText('Asia'));
    expect(onChangeAction).toHaveBeenCalledWith('Asia');
  });

  it('closes the list after selecting an option', () => {
    render(<Dropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole('combobox').querySelector('div')!);
    fireEvent.click(screen.getByText('Asia'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens with ArrowDown key and highlights first option', () => {
    render(<Dropdown {...defaultProps} />);
    const combobox = screen.getByRole('combobox');
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes with Escape key', () => {
    render(<Dropdown {...defaultProps} />);
    const combobox = screen.getByRole('combobox');
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    fireEvent.keyDown(combobox, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks selected option with aria-selected', () => {
    render(<Dropdown {...defaultProps} value="Asia" />);
    fireEvent.click(screen.getByRole('combobox').querySelector('div')!);
    const selected = screen.getByRole('option', { name: 'Asia' });
    expect(selected).toHaveAttribute('aria-selected', 'true');
  });

  it('has aria-expanded=false when closed', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-expanded=true when open', () => {
    render(<Dropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole('combobox').querySelector('div')!);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });
});
