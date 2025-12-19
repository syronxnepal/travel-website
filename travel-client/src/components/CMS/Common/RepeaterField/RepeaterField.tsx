import React from 'react';
import FormField from '../FormField/FormField';
import StringRepeaterField from '../StringRepeaterField/StringRepeaterField';
import './RepeaterField.scss';

interface RepeaterFieldProps {
  label: string;
  value: any[];
  onChange: (value: any[]) => void;
  fields: Array<{
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'number' | 'select' | 'string-array';
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    addButtonText?: string;
    emptyMessage?: string;
  }>;
  addButtonText?: string;
  emptyMessage?: string;
  className?: string;
  helpText?: string;
}

const RepeaterField: React.FC<RepeaterFieldProps> = ({
  label,
  value = [],
  onChange,
  fields,
  addButtonText = 'Add Item',
  emptyMessage = 'No items added yet',
  className = '',
  helpText
}) => {
  const handleAdd = () => {
    const newItem: any = {};
    fields.forEach(field => {
      if (field.type === 'number') {
        newItem[field.name] = 0;
      } else if (field.type === 'select' && field.options && field.options.length > 0) {
        newItem[field.name] = field.options[0].value;
      } else if (field.type === 'string-array') {
        newItem[field.name] = [];
      } else {
        newItem[field.name] = '';
      }
    });
    onChange([...value, newItem]);
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleItemChange = (index: number, fieldName: string, fieldValue: any) => {
    const newValue = [...value];
    newValue[index] = {
      ...newValue[index],
      [fieldName]: fieldValue
    };
    onChange(newValue);
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
    <div className={`repeater-field ${className}`}>
      <div className="repeater-field__header">
        <label className="repeater-field__label">
          {label}
        </label>
        {helpText && (
          <p className="repeater-field__help">{helpText}</p>
        )}
      </div>

      <div className="repeater-field__items">
        {value.length === 0 ? (
          <div className="repeater-field__empty">
            <i className="fa-solid fa-inbox"></i>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          value.map((item, index) => (
            <div key={index} className="repeater-field__item">
              <div className="repeater-field__item-header">
                <div className="repeater-field__item-number">
                  <span>#{index + 1}</span>
                </div>
                <div className="repeater-field__item-actions">
                  <button
                    type="button"
                    className="repeater-field__action-btn"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    title="Move up"
                    aria-label="Move up"
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  <button
                    type="button"
                    className="repeater-field__action-btn"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === value.length - 1}
                    title="Move down"
                    aria-label="Move down"
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                  <button
                    type="button"
                    className="repeater-field__action-btn repeater-field__action-btn--danger"
                    onClick={() => handleRemove(index)}
                    title="Remove"
                    aria-label="Remove"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className="repeater-field__item-fields">
                {fields.map(field => {
                  if (field.type === 'string-array') {
                    return (
                      <StringRepeaterField
                        key={field.name}
                        label={field.label}
                        value={item[field.name] || []}
                        onChange={(val) => handleItemChange(index, field.name, val)}
                        placeholder={field.placeholder || 'Enter item'}
                        addButtonText={field.addButtonText || 'Add Item'}
                        emptyMessage={field.emptyMessage || 'No items added yet'}
                        required={field.required}
                      />
                    );
                  }
                  return (
                    <FormField
                      key={field.name}
                      label={field.label}
                      name={`${field.name}-${index}`}
                      type={field.type || 'text'}
                      value={item[field.name] || ''}
                      onChange={(val) => handleItemChange(index, field.name, val)}
                      placeholder={field.placeholder}
                      options={field.options}
                      required={field.required}
                    />
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        className="repeater-field__add-btn"
        onClick={handleAdd}
      >
        <i className="fa-solid fa-plus"></i>
        {addButtonText}
      </button>
    </div>
  );
};

export default RepeaterField;

