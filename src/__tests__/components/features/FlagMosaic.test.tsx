import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagMosaic from '@/components/features/HomePage/FlagMosaic';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockNav = vi.hoisted(() => ({
  params: { current: new URLSearchParams() },
  router: { replace: vi.fn() },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => mockNav.router,
  usePathname: () => '/',
  useSearchParams: () => mockNav.params.current,
}));

const mockCountries = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', population: 67000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', population: 125000000, continents: ['Asia'], mapUrl: '' },
  { name: 'Germany', capital: 'Berlin', flag: 'de.svg', population: 83000000, continents: ['Europe'], mapUrl: '' },
];

vi.mock('@/context/CountriesContext', () => ({
  useCountries: vi.fn(),
}));

import { useCountries } from '@/context/CountriesContext';
const mockUseCountries = useCountries as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockNav.params.current = new URLSearchParams();
  mockNav.router.replace.mockClear();
});

describe('FlagMosaic', () => {
  it('shows error message', () => {
    mockUseCountries.mockReturnValue({ countries: null, error: 'Failed' });
    render(<FlagMosaic />);
    expect(screen.getByText(/Error: Failed/i)).toBeInTheDocument();
  });

  it('renders flag cards when countries load', () => {
    mockUseCountries.mockReturnValue({ countries: mockCountries, error: null });
    render(<FlagMosaic />);
    expect(screen.getByAltText('France')).toBeInTheDocument();
    expect(screen.getByAltText('Japan')).toBeInTheDocument();
  });

  it('filters countries by search term from URL params', () => {
    mockNav.params.current = new URLSearchParams('search=france');
    mockUseCountries.mockReturnValue({ countries: mockCountries, error: null });
    render(<FlagMosaic />);
    expect(screen.getByAltText('France')).toBeInTheDocument();
    expect(screen.queryByAltText('Japan')).not.toBeInTheDocument();
  });

  it('shows no-match message when search finds nothing', () => {
    mockNav.params.current = new URLSearchParams('search=zzz');
    mockUseCountries.mockReturnValue({ countries: mockCountries, error: null });
    render(<FlagMosaic />);
    expect(screen.getByText(/No countries match your search/i)).toBeInTheDocument();
  });

  it('sorts A–Z by default', () => {
    mockUseCountries.mockReturnValue({ countries: mockCountries, error: null });
    render(<FlagMosaic />);
    const cards = screen.getAllByRole('button').filter((btn) => btn.id.startsWith('flag-card-'));
    expect(cards[0]).toHaveAttribute('id', 'flag-card-France');
  });

  it('sorts Z–A when sort=desc in URL params', () => {
    mockNav.params.current = new URLSearchParams('sort=desc');
    mockUseCountries.mockReturnValue({ countries: mockCountries, error: null });
    render(<FlagMosaic />);
    const cards = screen.getAllByRole('button').filter((btn) => btn.id.startsWith('flag-card-'));
    expect(cards[0]).toHaveAttribute('id', 'flag-card-Japan');
  });

  it('clicking sort calls router.replace with sort=desc', () => {
    mockUseCountries.mockReturnValue({ countries: mockCountries, error: null });
    render(<FlagMosaic />);
    fireEvent.click(screen.getByRole('button', { name: /A – Z|Z – A/ }));
    expect(mockNav.router.replace).toHaveBeenCalledWith('/?sort=desc');
  });
});