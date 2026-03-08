'use client';

import { useState, useRef, useEffect } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChangeAction(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef} id={id}>
      <div
        className={styles.selected}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || placeholder}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          ▾
        </span>
      </div>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.option} ${option === value ? styles.active : ''}`}
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
