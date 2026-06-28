import { useRef, useEffect } from 'react'
import './RichTextEditor.css'

function RichTextEditor({ value, onChange, placeholder = 'Write here...' }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [])

  function execCommand(command, val = null) {
    document.execCommand(command, false, val)
    editorRef.current.focus()
    handleChange()
  }

  function handleChange() {
    onChange(editorRef.current.innerHTML)
  }

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__toolbar">
        <button type="button" title="Bold" onClick={() => execCommand('bold')}><i className="fa-solid fa-bold"></i></button>
        <button type="button" title="Italic" onClick={() => execCommand('italic')}><i className="fa-solid fa-italic"></i></button>
        <button type="button" title="Underline" onClick={() => execCommand('underline')}><i className="fa-solid fa-underline"></i></button>
        <span className="rich-text-editor__sep" />
        <button type="button" title="Heading 2" onClick={() => execCommand('formatBlock', 'h2')}>H2</button>
        <button type="button" title="Heading 3" onClick={() => execCommand('formatBlock', 'h3')}>H3</button>
        <button type="button" title="Paragraph" onClick={() => execCommand('formatBlock', 'p')}>P</button>
        <span className="rich-text-editor__sep" />
        <button type="button" title="Unordered list" onClick={() => execCommand('insertUnorderedList')}><i className="fa-solid fa-list-ul"></i></button>
        <button type="button" title="Ordered list" onClick={() => execCommand('insertOrderedList')}><i className="fa-solid fa-list-ol"></i></button>
        <span className="rich-text-editor__sep" />
        <button type="button" title="Link" onClick={() => {
          const url = prompt('Enter URL:')
          if (url) execCommand('createLink', url)
        }}><i className="fa-solid fa-link"></i></button>
        <button type="button" title="Remove link" onClick={() => execCommand('unlink')}><i className="fa-solid fa-link-slash"></i></button>
      </div>
      <div
        ref={editorRef}
        className="rich-text-editor__content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleChange}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor
