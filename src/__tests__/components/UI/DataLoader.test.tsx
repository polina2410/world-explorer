import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DataLoader from '@/components/UI/DataLoader/DataLoader';

describe('DataLoader', () => {
  it('shows loading spinner when loading=true', () => {
    render(
      <DataLoader data={null} loading error={null}>
        {() => <span>content</span>}
      </DataLoader>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('shows error message when error is set', () => {
    render(
      <DataLoader data={null} loading={false} error="Something went wrong">
        {() => <span>content</span>}
      </DataLoader>
    );
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('shows default empty message when data is null', () => {
    render(
      <DataLoader data={null} loading={false} error={null}>
        {() => <span>content</span>}
      </DataLoader>
    );
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('shows custom empty message when data is null', () => {
    render(
      <DataLoader data={null} loading={false} error={null} emptyMessage="Nothing here">
        {() => <span>content</span>}
      </DataLoader>
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('shows empty message when data is an empty array', () => {
    render(
      <DataLoader data={[]} loading={false} error={null}>
        {() => <span>content</span>}
      </DataLoader>
    );
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders children when data is available', () => {
    const data = [{ name: 'France' }];
    render(
      <DataLoader data={data} loading={false} error={null}>
        {(d) => <span>{d[0].name}</span>}
      </DataLoader>
    );
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('passes data correctly to children', () => {
    render(
      <DataLoader data="hello" loading={false} error={null}>
        {(d) => <span>{d}</span>}
      </DataLoader>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('loading takes priority over error', () => {
    render(
      <DataLoader data={null} loading error="oops">
        {() => <span>content</span>}
      </DataLoader>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText(/Error/)).not.toBeInTheDocument();
  });
});
