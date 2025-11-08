import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  characterCount?: number;
  maxCharacters?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, characterCount = 0, maxCharacters, className = '', ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    React.useEffect(() => {
      adjustHeight();
    }, [props.value]);

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={textareaRef}
          onInput={adjustHeight}
          className={`
            w-full px-3 py-2
            border border-gray-200 dark:border-gray-700
            bg-transparent
            text-gray-800 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-0
            transition-colors duration-200
            disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50
            resize-none
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          style={{
            minHeight: props.rows ? `${props.rows * 1.5}rem` : 'auto',
          }}
          {...props}
        />
        <div className="flex justify-between items-center mt-2">
          <div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">{helperText}</p>
            )}
          </div>
          {maxCharacters && (
            <span className={`text-sm ${characterCount > maxCharacters ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
              {characterCount}/{maxCharacters}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
