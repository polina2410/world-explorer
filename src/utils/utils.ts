export function formatPopulation(pop: number): string {
  return pop.toLocaleString('en-US');
}

export function formatList(list: string[]): string {
  return list.length ? list.join(', ') : '—';
}
