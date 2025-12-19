import React from 'react';
import './StringRepeaterField.scss';

interface StringRepeaterFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  addButtonText?: string;
  emptyMessage?: string;
  className?: string;
  helpText?: string;
  required?: boolean;
}

const StringRepeaterField: React.FC<StringRepeaterFieldProps> = ({
  label,
  value = [],
  onChange,
  placeholder = 'Enter item',
  addButtonText = 'Add Item',
  emptyMessage = 'No items added yet',
  className = '',
  helpText,
  required = false
}) => {
  const handleAdd = () => {
    onChange([...value, '']);
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleItemChange = (index: number, newValue: string) => {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newValue = [...value];
    [newValue[index - 1], newValue[index]] = [newValue[index], newValue[index - 1]];
    onChange(newValue);
  };

  const handleMoveDown = (index: number) => {
    if (index === value.length - 1) return;
    const newValue = [...value];
    [newValue[index], newValue[index + 1]] = [newValue[index + 1], newValue[index]];
    onChange(newValue);
  };

  return (
    <div className={`string-repeater-field ${className}`}>
      <div className="string-repeater-field__header">
        <label className="string-repeater-field__label">
          {label}
          {required && <span className="string-repeater-field__required">*</span>}
        </label>
        {helpText && (
          <p className="string-repeater-field__help">{helpText}</p>
        )}
      </div>

      <div className="string-repeater-field__items">
        {value.length === 0 ? (
          <div className="string-repeater-field__empty">
            <i className="fa-solid fa-inbox"></i>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          value.map((item, index) => (
            <div key={index} className="string-repeater-field__item">
              <div className="string-repeater-field__item-number">
                <span>#{index + 1}</span>
              </div>
              <input
                type="text"
                className="string-repeater-field__input"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder={placeholder}
              />
              <div className="string-repeater-field__item-actions">
                <button
                  type="button"
                  className="string-repeater-field__action-btn"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  title="Move up"
                  aria-label="Move up"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
                <button
                  type="button"
                  className="string-repeater-field__action-btn"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === value.length - 1}
                  title="Move down"
                  aria-label="Move down"
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </button>
                <button
                  type="button"
                  className="string-repeater-field__action-btn string-repeater-field__action-btn--danger"
                  onClick={() => handleRemove(index)}
                  title="Remove"
                  aria-label="Remove"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        className="string-repeater-field__add-btn"
        onClick={handleAdd}
      >
        <i className="fa-solid fa-plus"></i>
        {addButtonText}
      </button>
    </div>
  );
};

export default StringRepeaterField;

