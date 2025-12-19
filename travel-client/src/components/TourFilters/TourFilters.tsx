import React, { useState } from 'react';
import './TourFilters.scss';

const TourFilters: React.FC = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [25, 500],
    durationRange: [1, 7],
    ratings: [] as string[],
    difficulties: [] as string[]
  });

  const categories = [
    { name: 'Mustang', count: 8 },
    { name: 'Nepal', count: 12 },
    { name: 'Langtang', count: 6 },
    { name: 'Pokhara', count: 4 }
  ];

  const difficulties = [
    { name: 'Easy', count: 5 },
    { name: 'Medium', count: 8 },
    { name: 'Hard', count: 3 }
  ];


  const handleCheckboxChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[category] as string[];
      return {
        ...prev,
        [category]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const FilterSection = ({ title, items, category }: { title: string; items: any[]; category: keyof typeof filters }) => (
    <div className="tour-filters__section">
      <h3 className="tour-filters__section-title">{title}</h3>
      <div className="tour-filters__items">
        {items.map((item, index) => (
          <label key={index} className="tour-filters__item">
            <input
              type="checkbox"
              checked={(filters[category] as string[]).includes(item.name)}
              onChange={() => handleCheckboxChange(category, item.name)}
              className="tour-filters__checkbox"
            />
            <span className="tour-filters__label">
              {item.name} ({item.count})
            </span>
          </label>
        ))}
        {/* <button className="tour-filters__show-more">Show More</button> */}
      </div>
    </div>
  );

  return (
    <aside className="tour-filters">
      <h2 className="tour-filters__title">Filters</h2>
      
      <FilterSection title="Destination" items={categories} category="categories" />
      
      <div className="tour-filters__section">
        <h3 className="tour-filters__section-title">Price Range</h3>
        <div className="tour-filters__range">
          <span className="tour-filters__range-value">${filters.priceRange[0]}</span>
          <span className="tour-filters__range-value">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="25"
          max="1000"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
          className="tour-filters__slider"
        />
      </div>

      <div className="tour-filters__section">
        <h3 className="tour-filters__section-title">Duration</h3>
        <div className="tour-filters__range">
          <span className="tour-filters__range-value">{filters.durationRange[0]} Days</span>
          <span className="tour-filters__range-value">{filters.durationRange[1]} Days</span>
        </div>
        <input
          type="range"
          min="1"
          max="14"
          value={filters.durationRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, durationRange: [prev.durationRange[0], parseInt(e.target.value)] }))}
          className="tour-filters__slider"
        />
      </div>

      {/* <FilterSection title="Rating" items={ratings} category="ratings" /> */}
      <FilterSection title="Difficulty" items={difficulties} category="difficulties" />
    </aside>
  );
};

export default TourFilters;
