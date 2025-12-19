import React, { useState } from 'react';
import './TrekkingFilters.scss';

const TrekkingFilters: React.FC = () => {
  const [filters, setFilters] = useState({
    destinations: [] as string[],
    priceRange: [99, 319],
    durationRange: [3, 10],
    activities: [] as string[],
    tripTypes: [] as string[],
    tags: [] as string[],
    difficulties: [] as string[]
  });

  const destinations = [
    { name: 'Everest Base Camp', count: 5 },
    { name: 'Annapurna Circuit', count: 2 },
    { name: 'Manaslu Trek', count: 2 },
    { name: 'Langtang Valley', count: 1 }
  ];

  // const activities = [
  //   { name: 'Adventures', count: 4 },
  //   { name: 'Local Flavor', count: 5 },
  //   { name: 'Relaxation', count: 3 },
  //   { name: 'Swimming', count: 4 }
  // ];

  // const tripTypes = [
  //   { name: 'Adventure', count: 2 },
  //   { name: 'Beach Tour', count: 3 },
  //   { name: 'Cruise Tour', count: 2 },
  //   { name: 'Nature Walks', count: 3 }
  // ];

  // const tags = [
  //   { name: 'Group Tour', count: 5 },
  //   { name: 'Guided Tour', count: 4 },
  //   { name: 'Photographer', count: 1 },
  //   { name: 'Private Tour', count: 2 }
  // ];

  // const difficulties = [
  //   { name: 'Easy', count: 1 },
  //   { name: 'Hard', count: 4 },
  //   { name: 'Medium', count: 6 }
  // ];

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
    <div className="trekking-filters__section">
      <h3 className="trekking-filters__section-title">{title}</h3>
      <div className="trekking-filters__items">
        {items.map((item, index) => (
          <label key={index} className="trekking-filters__item">
            <input
              type="checkbox"
              checked={(filters[category] as string[]).includes(item.name)}
              onChange={() => handleCheckboxChange(category, item.name)}
              className="trekking-filters__checkbox"
            />
            <span className="trekking-filters__label">
              {item.name} ({item.count})
            </span>
          </label>
        ))}
        <button className="trekking-filters__show-more">Show More</button>
      </div>
    </div>
  );

  return (
    <aside className="trekking-filters">
      <h2 className="trekking-filters__title">Criteria</h2>
      
      <FilterSection title="Destination" items={destinations} category="destinations" />
      
      <div className="trekking-filters__section">
        <h3 className="trekking-filters__section-title">Price</h3>
        <div className="trekking-filters__range">
          <span className="trekking-filters__range-value">${filters.priceRange[0]}</span>
          <span className="trekking-filters__range-value">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="99"
          max="500"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
          className="trekking-filters__slider"
        />
      </div>

      <div className="trekking-filters__section">
        <h3 className="trekking-filters__section-title">Duration</h3>
        <div className="trekking-filters__range">
          <span className="trekking-filters__range-value">{filters.durationRange[0]} Days</span>
          <span className="trekking-filters__range-value">{filters.durationRange[1]} Days</span>
        </div>
        <input
          type="range"
          min="1"
          max="15"
          value={filters.durationRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, durationRange: [prev.durationRange[0], parseInt(e.target.value)] }))}
          className="trekking-filters__slider"
        />
      </div>
{/* 
      <FilterSection title="Activities" items={activities} category="activities" />
      <FilterSection title="Trip Types" items={tripTypes} category="tripTypes" />
      <FilterSection title="Tags" items={tags} category="tags" />
      <FilterSection title="Difficulties" items={difficulties} category="difficulties" /> */}
    </aside>
  );
};

export default TrekkingFilters;
