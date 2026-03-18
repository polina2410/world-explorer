export function formatPopulation(pop: number): string {
  return pop.toLocaleString('en-US');
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function formatList(list: string[]): string {
  return list.length ? list.join(', ') : '—';
}
