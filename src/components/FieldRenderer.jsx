import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export default function FieldRenderer({ field }) {
  const { updateFieldValue, validateFieldValue } = useContext(FormContext);

  const errors = validateFieldValue(field);

  function onChange(e) {
    let val = e.target.value;
    if (field.type === 'checkbox') {
      val = e.target.checked;
    }
    updateFieldValue(field.id, val);
  }

  return (
    <div className="mb-5">
      <label className="block font-semibold mb-1">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>

      {field.type === 'text' && (
        <input
          type="text"
          placeholder={field.placeholder}
          className={`w-full p-2 border rounded ${
            errors.length ? 'border-red-500' : 'border-gray-300'
          }`}
          value={field.value}
          onChange={onChange}
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          placeholder={field.placeholder}
          className={`w-full p-2 border rounded ${
            errors.length ? 'border-red-500' : 'border-gray-300'
          }`}
          value={field.value}
          onChange={onChange}
        />
      )}

      {field.type === 'dropdown' && (
        <select
          className={`w-full p-2 border rounded text-black ${
            errors.length ? 'border-red-500' : 'border-gray-300'
          }`}
          value={field.value}
          onChange={onChange}
        >
          <option value="">-- Select --</option>
          {field.options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === 'checkbox' && (
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.value || false}
            onChange={onChange}
          />
          <span>{field.helpText}</span>
        </label>
      )}

      {field.type === 'date' && (
        <input
          type="date"
          className={`w-full p-2 border rounded ${
            errors.length ? 'border-red-500' : 'border-gray-300'
          }`}
          value={field.value}
          onChange={onChange}
        />
      )}

      {field.helpText && field.type !== 'checkbox' && (
        <p className="text-sm text-gray-500 mt-1">{field.helpText}</p>
      )}

      {errors.length > 0 && (
        <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
