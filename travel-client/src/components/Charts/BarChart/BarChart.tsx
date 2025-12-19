import React from 'react';
import './BarChart.scss';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, height = 300 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const range = maxValue || 1;

  const getBarHeight = (value: number) => {
    return (value / range) * height * 0.8;
  };

  const getBarWidth = () => {
    return 100 / data.length;
  };

  const barWidth = getBarWidth();

  return (
    <div className="bar-chart">
      <h4 className="bar-chart__title">{title}</h4>
      <svg viewBox={`0 0 100 ${height}`} className="bar-chart__svg">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = getBarHeight(item.value);
          const x = index * barWidth + barWidth * 0.1;
          const y = height - barHeight;
          const width = barWidth * 0.8;
          const color = item.color || '#3b82f6';

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={width}
                height={barHeight}
                fill={color}
                rx="1"
                className="bar-chart__bar"
              />
              <text
                x={x + width / 2}
                y={y - 3}
                textAnchor="middle"
                fontSize="1.5"
                fill="#6b7280"
                className="bar-chart__value"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="bar-chart__labels">
        {data.map((item, index) => (
          <span key={index} className="bar-chart__label">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BarChart;

