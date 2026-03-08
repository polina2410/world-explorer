'use client';

import styles from './SearchPanel.module.css';

type SearchPanelProps = {
  value: string;
  onChangeAction: (value: string) => void;
  placeholder?: string;
  id?: string;
};

export default function SearchPanel({
  value,
  onChangeAction,
  placeholder = 'Search country...',
  id,
}: SearchPanelProps) {
  return (
    <input
      type="text"
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChangeAction(e.target.value)}
      className={styles.searchInput}
    />
  );
}
