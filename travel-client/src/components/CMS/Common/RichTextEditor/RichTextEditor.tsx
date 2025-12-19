import React, { useRef, useEffect } from 'react';
import './RichTextEditor.scss';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter content...',
  label,
  required = false,
  className = ''
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    if (command === 'createLink') {
      const url = prompt('Enter the URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else {
      document.execCommand(command, false, value || undefined);
    }
    editorRef.current?.focus();
    handleInput();
  };

  const ToolbarButton: React.FC<{ 
    command: string; 
    icon: string; 
    title: string;
    value?: string;
  }> = ({ command, icon, title, value }) => (
    <button
      type="button"
      className="rich-text-editor__toolbar-btn"
      onClick={() => execCommand(command, value)}
      title={title}
      aria-label={title}
    >
      <i className={`fa-solid ${icon}`}></i>
    </button>
  );

  return (
    <div className={`rich-text-editor ${className}`}>
      {label && (
        <label className="rich-text-editor__label">
          {label}
          {required && <span className="rich-text-editor__required">*</span>}
        </label>
      )}
      
      <div className="rich-text-editor__toolbar">
        <div className="rich-text-editor__toolbar-group">
          <ToolbarButton command="bold" icon="fa-bold" title="Bold" />
          <ToolbarButton command="italic" icon="fa-italic" title="Italic" />
          <ToolbarButton command="underline" icon="fa-underline" title="Underline" />
        </div>
        
        <div className="rich-text-editor__toolbar-separator"></div>
        
        <div className="rich-text-editor__toolbar-group">
          <ToolbarButton command="formatBlock" icon="fa-heading" title="Heading" value="h2" />
          <ToolbarButton command="formatBlock" icon="fa-paragraph" title="Paragraph" value="p" />
        </div>
        
        <div className="rich-text-editor__toolbar-separator"></div>
        
        <div className="rich-text-editor__toolbar-group">
          <ToolbarButton command="insertUnorderedList" icon="fa-list-ul" title="Bullet List" />
          <ToolbarButton command="insertOrderedList" icon="fa-list-ol" title="Numbered List" />
        </div>
        
        <div className="rich-text-editor__toolbar-separator"></div>
        
        <div className="rich-text-editor__toolbar-group">
          <ToolbarButton command="justifyLeft" icon="fa-align-left" title="Align Left" />
          <ToolbarButton command="justifyCenter" icon="fa-align-center" title="Align Center" />
          <ToolbarButton command="justifyRight" icon="fa-align-right" title="Align Right" />
        </div>
        
        <div className="rich-text-editor__toolbar-separator"></div>
        
        <div className="rich-text-editor__toolbar-group">
          <ToolbarButton command="createLink" icon="fa-link" title="Insert Link" />
          <ToolbarButton command="unlink" icon="fa-unlink" title="Remove Link" />
        </div>
      </div>
      
      <div
        ref={editorRef}
        className="rich-text-editor__editor"
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;

