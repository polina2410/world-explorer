'use client';

import Loading from '@/components/UI/Loading/Loading';
import React, { ReactNode } from 'react';

type DataLoaderProps<T> = {
  data: T | null | undefined;
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
  children: (data: T) => ReactNode;
};

export default function DataLoader<T>({
  data,
  loading,
  error,
  emptyMessage = 'No data available',
  children,
}: DataLoaderProps<T>) {
  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!data || (Array.isArray(data) && data.length === 0))
    return <p>{emptyMessage}</p>;

  return <>{children(data)}</>;
}
