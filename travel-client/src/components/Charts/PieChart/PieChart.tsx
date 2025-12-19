import React from 'react';
import './PieChart.scss';

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  let currentPercent = 0;

  const paths = data.map((item, index) => {
    const percent = item.value / total;
    const [startX, startY] = getCoordinatesForPercent(currentPercent);
    const [endX, endY] = getCoordinatesForPercent(currentPercent + percent);
    
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    
    const pathData = [
      'M', startX, startY,
      'A', 1, 1, 0, largeArcFlag, 1, endX, endY,
      'L', 0, 0,
      'Z'
    ].join(' ');

    currentPercent += percent;

    return (
      <path
        key={index}
        d={pathData}
        fill={item.color}
        stroke="#fff"
        strokeWidth="0.1"
      />
    );
  });

  return (
    <div className="pie-chart">
      <h4 className="pie-chart__title">{title}</h4>
      <div className="pie-chart__content">
        <svg viewBox="-1.1 -1.1 2.2 2.2" className="pie-chart__svg">
          {paths}
        </svg>
        <div className="pie-chart__legend">
          {data.map((item, index) => (
            <div key={index} className="pie-chart__legend-item">
              <div
                className="pie-chart__legend-color"
                style={{ background: item.color }}
              ></div>
              <span className="pie-chart__legend-label">{item.label}</span>
              <span className="pie-chart__legend-value">{item.value} ({Math.round((item.value / total) * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;

