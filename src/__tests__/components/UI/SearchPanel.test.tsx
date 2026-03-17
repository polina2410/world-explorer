import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPanel from '@/components/UI/SearchPanel/SearchPanel';

describe('SearchPanel', () => {
  it('renders the search input', () => {
    render(<SearchPanel value="" onChangeAction={vi.fn()} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchPanel value="" onChangeAction={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search country...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchPanel value="" onChangeAction={vi.fn()} placeholder="Find a flag..." />);
    expect(screen.getByPlaceholderText('Find a flag...')).toBeInTheDocument();
  });

  it('renders the label with default text', () => {
    render(<SearchPanel value="" onChangeAction={vi.fn()} id="search" />);
    expect(screen.getByText('Search for a country')).toBeInTheDocument();
  });

  it('renders custom label text', () => {
    render(<SearchPanel value="" onChangeAction={vi.fn()} id="search" label="Search flags" />);
    expect(screen.getByText('Search flags')).toBeInTheDocument();
  });

  it('label is linked to input via id', () => {
    render(<SearchPanel value="" onChangeAction={vi.fn()} id="my-search" />);
    expect(screen.getByLabelText('Search for a country')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<SearchPanel value="france" onChangeAction={vi.fn()} />);
    expect(screen.getByRole('searchbox')).toHaveValue('france');
  });

  it('calls onChangeAction with new value on input', () => {
    const onChangeAction = vi.fn();
    render(<SearchPanel value="" onChangeAction={onChangeAction} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'japan' } });
    expect(onChangeAction).toHaveBeenCalledWith('japan');
  });
});
