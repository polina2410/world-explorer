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
  label = 'Search for a country',
}: SearchPanelProps & { label?: string }) {
  return (
    <div className={styles.searchWrapper}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="search"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeAction(e.target.value)}
        className={styles.searchInput}
        aria-label={label}
      />
    </div>
  );
}
