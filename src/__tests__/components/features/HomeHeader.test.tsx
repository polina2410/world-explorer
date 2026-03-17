import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeHeader from '@/components/features/HomeHeader/HomeHeader';
import { vi } from 'vitest';

vi.mock('motion/react', () => import('@/__tests__/__mocks__/motionMock'));

describe('HomeHeader', () => {
  it('renders the main title', () => {
    render(<HomeHeader />);
    expect(screen.getByText(/Welcome to Country Explorer/i)).toBeInTheDocument();
  });

  it('renders the first description paragraph', () => {
    render(<HomeHeader />);
    expect(screen.getByText(/Discover the world one country at a time/i)).toBeInTheDocument();
  });

  it('renders the second description paragraph', () => {
    render(<HomeHeader />);
    expect(screen.getByText(/Click on any flag below to flip it/i)).toBeInTheDocument();
  });
});
