'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  compact?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search',
  onClear,
  className = '',
  compact = false,
}) => {
  return (
    <div className={`relative flex-1 ${className}`}>
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          bg-[#262626]
          text-white
          placeholder-[#808080]
          px-4 py-3 pl-10 pr-4
          rounded-full
          border border-[#383939]
          focus:border-[#505050]
          focus:outline-none
          focus:ring-1 focus:ring-[#505050]
          transition-all
          ${compact ? 'py-2 text-sm' : ''}
        `}
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;

