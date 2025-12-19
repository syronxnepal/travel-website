import React from 'react';
import './LineChart.scss';

interface LineChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, height = 300 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const getYPosition = (value: number) => {
    return height - ((value - minValue) / range) * height * 0.9 - height * 0.05;
  };

  const getPoints = () => {
    const width = 100;
    const pointWidth = width / (data.length - 1 || 1);
    
    return data.map((item, index) => ({
      x: index * pointWidth,
      y: getYPosition(item.value),
      ...item
    }));
  };

  const points = getPoints();
  
  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`)
    .join(' ');

  return (
    <div className="line-chart">
      <h4 className="line-chart__title">{title}</h4>
      <svg viewBox={`0 0 100 ${height * 100 / 600}`} className="line-chart__svg">
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
        
        {/* Line path */}
        <path
          d={pathData}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="#3b82f6"
              stroke="#fff"
              strokeWidth="1"
            />
            <text
              x={point.x}
              y={point.y - 2}
              textAnchor="middle"
              fontSize="1.5"
              fill="#6b7280"
            >
              {point.value}
            </text>
          </g>
        ))}
      </svg>
      
      {/* X-axis labels */}
      <div className="line-chart__labels">
        {data.map((item, index) => (
          <span key={index} className="line-chart__label">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;

