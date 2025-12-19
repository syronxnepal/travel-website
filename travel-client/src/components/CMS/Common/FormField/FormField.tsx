import React from 'react';
import './FormField.scss';

interface FormFieldProps {
  label: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  options?: ({ value: string; label: string } | string)[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  options = [],
  rows = 4,
  min,
  max,
  step,
  className = '',
  disabled = false
}) => {
  const fieldId = `field-${name}`;

  const renderInput = () => {
    const commonProps = {
      id: fieldId,
      name,
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (type === 'checkbox') {
          onChange((e.target as HTMLInputElement).checked);
        } else if (type === 'number') {
          onChange(parseFloat(e.target.value) || 0);
        } else {
          onChange(e.target.value);
        }
      },
      placeholder,
      required,
      disabled,
      className: `form-field__input form-field__input--${type} ${error ? 'error' : ''}`
    };

    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={rows}
            className={`form-field__textarea ${error ? 'error' : ''}`}
          />
        );

      case 'select':
        return (
          <select {...commonProps} className={`form-field__select ${error ? 'error' : ''}`}>
            <option value="">Select an option</option>
            {options.map((option) => {
              // Handle both string arrays and object arrays
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        );

      case 'checkbox':
        return (
          <div className="form-field__checkbox-wrapper">
            <input
              {...commonProps}
              type="checkbox"
              checked={!!value}
              className={`form-field__checkbox ${error ? 'error' : ''}`}
            />
            <label htmlFor={fieldId} className="form-field__checkbox-label">
              {label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="form-field__radio-group">
            {options.map((option, index) => {
              // Handle both string arrays and object arrays
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const optionKey = typeof option === 'string' ? `${option}-${index}` : option.value;
              return (
                <div key={optionKey} className="form-field__radio-item">
                  <input
                    type="radio"
                    id={`${fieldId}-${optionValue}`}
                    name={name}
                    value={optionValue}
                    checked={value === optionValue}
                    onChange={(e) => onChange(e.target.value)}
                    className={`form-field__radio ${error ? 'error' : ''}`}
                  />
                  <label htmlFor={`${fieldId}-${optionValue}`} className="form-field__radio-label">
                    {optionLabel}
                  </label>
                </div>
              );
            })}
          </div>
        );

      default:
        return (
          <input
            {...commonProps}
            type={type}
            min={min}
            max={max}
            step={step}
          />
        );
    }
  };

  return (
    <div className={`form-field ${className} ${error ? 'form-field--error' : ''}`}>
      {type !== 'checkbox' && (
        <label htmlFor={fieldId} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {helpText && !error && (
        <p className="form-field__help">{helpText}</p>
      )}
      
      {error && (
        <p className="form-field__error">
          <i className="fa-solid fa-exclamation-circle"></i>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
