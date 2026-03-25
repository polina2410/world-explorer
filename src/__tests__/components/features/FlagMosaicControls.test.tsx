import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagMosaicControls from '@/components/features/HomePage/FlagMosaicControls/FlagMosaicControls';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

const defaultProps = {
  searchTerm: '',
  setSearchTerm: vi.fn(),
  sortOrder: 'asc' as const,
  toggleSortOrder: vi.fn(),
  selectedContinent: 'All',
  setSelectedContinent: vi.fn(),
  continents: ['Europe', 'Asia', 'Africa'],
};

describe('FlagMosaicControls', () => {
  it('renders the search input', () => {
    render(<FlagMosaicControls {...defaultProps} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders the sort button', () => {
    render(<FlagMosaicControls {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows "A – Z" when sortOrder is asc', () => {
    render(<FlagMosaicControls {...defaultProps} sortOrder="asc" />);
    expect(screen.getByText('A – Z')).toBeInTheDocument();
  });

  it('shows "Z – A" when sortOrder is desc', () => {
    render(<FlagMosaicControls {...defaultProps} sortOrder="desc" />);
    expect(screen.getByText('Z – A')).toBeInTheDocument();
  });

  it('calls toggleSortOrder when sort button is clicked', () => {
    const toggleSortOrder = vi.fn();
    render(
      <FlagMosaicControls {...defaultProps} toggleSortOrder={toggleSortOrder} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(toggleSortOrder).toHaveBeenCalledTimes(1);
  });

  it('renders the continent dropdown with All option', () => {
    render(<FlagMosaicControls {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('calls setSearchTerm when typing in the search box', () => {
    const setSearchTerm = vi.fn();
    render(
      <FlagMosaicControls {...defaultProps} setSearchTerm={setSearchTerm} />
    );
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'france' },
    });
    expect(setSearchTerm).toHaveBeenCalledWith('france');
  });

  it('calls setSelectedContinent when a continent is chosen from dropdown', () => {
    const setSelectedContinent = vi.fn();
    render(
      <FlagMosaicControls
        {...defaultProps}
        setSelectedContinent={setSelectedContinent}
      />
    );
    fireEvent.click(screen.getByRole('combobox').querySelector('div')!);
    fireEvent.click(screen.getByText('Europe'));
    expect(setSelectedContinent).toHaveBeenCalledWith('Europe');
  });
});
