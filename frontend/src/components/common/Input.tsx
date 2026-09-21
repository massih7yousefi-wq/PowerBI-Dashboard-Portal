import type {
  InputHTMLAttributes,
} from 'react';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  ...props
}: InputProps) {
  return (
    <div className="field">
      {label && (
        <label
          className="field-label"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`input ${
          error ? 'input-error' : ''
        }`}
        {...props}
      />

      {hint && !error && (
        <span className="field-hint">
          {hint}
        </span>
      )}

      {error && (
        <span className="field-error">
          {error}
        </span>
      )}
    </div>
  );
}