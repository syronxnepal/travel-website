import React from 'react';
import './PackageDetailsForm.scss';

interface PackageDetailsFormProps {
  groupSize: number;
  duration: number;
  startDate: string;
  endDate: string;
  preferences: string;
  onGroupSizeChange: (size: number) => void;
  onDurationChange: (duration: number) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onPreferencesChange: (preferences: string) => void;
}

const PackageDetailsForm: React.FC<PackageDetailsFormProps> = ({
  groupSize,
  duration,
  startDate,
  endDate,
  preferences,
  onGroupSizeChange,
  onDurationChange,
  onStartDateChange,
  onEndDateChange,
  onPreferencesChange
}) => {
  const handleDurationChange = (newDuration: number) => {
    onDurationChange(newDuration);
    // Auto-calculate end date based on start date and duration
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + newDuration);
      onEndDateChange(end.toISOString().split('T')[0]);
    }
  };

  const handleStartDateChange = (date: string) => {
    onStartDateChange(date);
    // Auto-calculate end date based on start date and duration
    if (date && duration > 0) {
      const start = new Date(date);
      const end = new Date(start);
      end.setDate(start.getDate() + duration);
      onEndDateChange(end.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="package-details-form">
      <h3 className="package-details-form__title">Package Details</h3>
      <p className="package-details-form__subtitle">
        Provide details about your group and travel preferences
      </p>

      <div className="package-details-form__grid">
        <div className="package-details-form__field">
          <label className="package-details-form__label">
            <i className="fa-solid fa-users"></i>
            Group Size
          </label>
          <div className="package-details-form__input-group">
            <button
              className="package-details-form__btn"
              onClick={() => onGroupSizeChange(Math.max(1, groupSize - 1))}
              disabled={groupSize <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <input
              type="number"
              value={groupSize}
              onChange={(e) => onGroupSizeChange(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="50"
              className="package-details-form__input"
            />
            <button
              className="package-details-form__btn"
              onClick={() => onGroupSizeChange(Math.min(50, groupSize + 1))}
              disabled={groupSize >= 50}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <p className="package-details-form__help">Number of people traveling</p>
        </div>

        <div className="package-details-form__field">
          <label className="package-details-form__label">
            <i className="fa-solid fa-calendar-days"></i>
            Duration (Days)
          </label>
          <div className="package-details-form__input-group">
            <button
              className="package-details-form__btn"
              onClick={() => handleDurationChange(Math.max(1, duration - 1))}
              disabled={duration <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <input
              type="number"
              value={duration}
              onChange={(e) => handleDurationChange(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="30"
              className="package-details-form__input"
            />
            <button
              className="package-details-form__btn"
              onClick={() => handleDurationChange(Math.min(30, duration + 1))}
              disabled={duration >= 30}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <p className="package-details-form__help">Total trip duration</p>
        </div>

        <div className="package-details-form__field">
          <label className="package-details-form__label">
            <i className="fa-solid fa-calendar"></i>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="package-details-form__date-input"
          />
          <p className="package-details-form__help">When do you want to start?</p>
        </div>

        <div className="package-details-form__field">
          <label className="package-details-form__label">
            <i className="fa-solid fa-calendar-check"></i>
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="package-details-form__date-input"
          />
          <p className="package-details-form__help">When do you want to return?</p>
        </div>
      </div>

      <div className="package-details-form__field package-details-form__field--full">
        <label className="package-details-form__label">
          <i className="fa-solid fa-heart"></i>
          Special Preferences
        </label>
        <textarea
          value={preferences}
          onChange={(e) => onPreferencesChange(e.target.value)}
          placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or other preferences..."
          className="package-details-form__textarea"
          rows={4}
        />
        <p className="package-details-form__help">
          Any special requirements or preferences for your trip
        </p>
      </div>
    </div>
  );
};

export default PackageDetailsForm;
