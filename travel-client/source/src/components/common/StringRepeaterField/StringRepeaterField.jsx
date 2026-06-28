import '../RepeaterField/RepeaterField.css'

function StringRepeaterField({ label, items = [], onChange, placeholder = 'Enter value', addLabel = 'Add' }) {
  function addItem() {
    onChange([...items, ''])
  }

  function updateItem(index, value) {
    onChange(items.map((item, i) => (i === index ? value : item)))
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="repeater-field string-repeater-field">
      {label && <label className="repeater-field__label">{label}</label>}
      <div className="repeater-field__list">
        {items.map((item, index) => (
          <div key={index} className="string-repeater-field__input-row">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
            />
            <button type="button" className="repeater-field__remove" onClick={() => removeItem(index)}>
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

export default StringRepeaterField
