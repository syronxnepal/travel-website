import './RepeaterField.css'

function RepeaterField({ label, items = [], onChange, renderItem, defaultItem, addLabel = 'Add Item' }) {
  function addItem() {
    onChange([...items, { ...defaultItem, _id: Date.now() }])
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  function updateItem(index, updated) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...updated } : item)))
  }

  return (
    <div className="repeater-field">
      {label && <label className="repeater-field__label">{label}</label>}
      <div className="repeater-field__list">
        {items.map((item, index) => (
          <div key={item._id || index} className="repeater-field__item">
            <div className="repeater-field__content">
              {renderItem(item, index, (updated) => updateItem(index, updated))}
            </div>
            <button
              type="button"
              className="repeater-field__remove"
              onClick={() => removeItem(index)}
              title="Remove"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="repeater-field__add" onClick={addItem}>
        <i className="fa-solid fa-plus"></i> {addLabel}
      </button>
    </div>
  )
}

export default RepeaterField
