import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={`textarea ${error ? 'input-error' : ''}`}
        {...props}
      />

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}