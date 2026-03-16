'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  value: string;
  options: string[];
  onChangeAction: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export default function Dropdown({
  value,
  options,
  onChangeAction,
  placeholder = 'Select...',
  id,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChangeAction(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + options.length) % options.length
      );
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlightedIndex >= 0) handleSelect(options[highlightedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}
      id={id}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={id ? `${id}-listbox` : undefined}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`${styles.selected} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={placeholder}
      >
        {value || placeholder}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          ▾
        </span>
      </div>

      {isOpen && (
        <div className={styles.options} role="listbox">
          {options.map((option, index) => (
            <div
              key={option}
              role="option"
              aria-selected={value === option}
              className={`${styles.option} ${option === value ? styles.active : ''} ${
                index === highlightedIndex ? styles.highlighted : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
