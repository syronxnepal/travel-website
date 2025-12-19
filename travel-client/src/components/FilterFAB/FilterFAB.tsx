import React from 'react';
import './FilterFAB.scss';

interface FilterFABProps {
  onClick: () => void;
  filterCount?: number;
}

const FilterFAB: React.FC<FilterFABProps> = ({ onClick, filterCount }) => {
  return (
    <button 
      className="filter-fab"
      onClick={onClick}
      aria-label="Open filters"
    >
      <i className="fa-solid fa-filter"></i>
      {filterCount && filterCount > 0 && (
        <span className="filter-fab__badge">{filterCount}</span>
      )}
    </button>
  );
};

export default FilterFAB;
