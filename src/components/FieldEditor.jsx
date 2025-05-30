import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';

export default function FieldEditor() {
  const {
    fields,
    selectedFieldId,
    updateField,
    deleteField,
    deselectField,
  } = useContext(FormContext);

  const field = fields.find((f) => f.id === selectedFieldId);
  const [local, setLocal] = useState(null);

  // Sync local state with selected field whenever selection changes
  useEffect(() => {
    if (field) {
      setLocal({
        label: field.label || '',
        placeholder: field.placeholder || '',
        required: field.required || false,
        helpText: field.helpText || '',
        options: field.options ? [...field.options] : [],
        minLength: field.minLength || '',
        maxLength: field.maxLength || '',
        pattern: field.pattern || '',
      });
    } else {
      setLocal(null);
    }
  }, [field]);

  if (!field) {
    return (
      <aside className="w-1/4 p-4 bg-gray-100 dark:bg-gray-700 h-screen overflow-auto">
        <p className="italic text-gray-500">Select a field to edit its settings.</p>
      </aside>
    );
  }

  if (!local) {
    return (
      <aside className="w-1/4 p-4 bg-gray-100 dark:bg-gray-700 h-screen flex items-center justify-center">
        <p className="italic text-gray-500">Loading...</p>
      </aside>
    );
  }

  // Handlers for input changes in the editor
  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setLocal((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  // Handle option text changes (for dropdown)
  function onOptionChange(index, value) {
    setLocal((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  }

  // Add new option to dropdown
  function addOption() {
    setLocal((prev) => ({
      ...prev,
      options: [...(prev.options || []), ''],
    }));
  }

  // Remove option from dropdown
  function removeOption(index) {
    setLocal((prev) => {
      const newOptions = [...prev.options];
      newOptions.splice(index, 1);
      return { ...prev, options: newOptions };
    });
  }

  // Save local changes to context
  function onSave() {
    updateField(field.id, {
      label: local.label,
      placeholder: local.placeholder,
      required: local.required,
      helpText: local.helpText,
      options: local.options,
      minLength: local.minLength,
      maxLength: local.maxLength,
      pattern: local.pattern,
    });
  }

  // Delete field and deselect
  function onDelete() {
    deleteField(field.id);
    deselectField();
  }

  return (
    <aside className="w-1/4 p-4 bg-gray-100 dark:bg-gray-700 h-screen overflow-auto text-white">
      <h2 className="text-xl font-semibold mb-4">Edit Field</h2>

      <div className="mb-3">
        <label className="block font-semibold mb-1" htmlFor="label">
          Label
        </label>
        <input
          id="label"
          type="text"
          name="label"
          value={local.label}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {field.type !== 'checkbox' && (
        <div className="mb-3">
          <label className="block font-semibold mb-1" htmlFor="placeholder">
            Placeholder
          </label>
          <input
            id="placeholder"
            type="text"
            name="placeholder"
            value={local.placeholder}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <div className="mb-3 flex items-center space-x-2">
        <input
          id="required"
          type="checkbox"
          name="required"
          checked={local.required}
          onChange={onChange}
          className="mr-2"
        />
        <label htmlFor="required" className="font-semibold">
          Required
        </label>
      </div>

      <div className="mb-3">
        <label className="block font-semibold mb-1" htmlFor="helpText">
          Help Text
        </label>
        <input
          id="helpText"
          type="text"
          name="helpText"
          value={local.helpText}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {(field.type === 'text' || field.type === 'textarea') && (
        <>
          <div className="mb-3">
            <label className="block font-semibold mb-1" htmlFor="minLength">
              Min Length
            </label>
            <input
              id="minLength"
              type="number"
              name="minLength"
              value={local.minLength}
              onChange={onChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold mb-1" htmlFor="maxLength">
              Max Length
            </label>
            <input
              id="maxLength"
              type="number"
              name="maxLength"
              value={local.maxLength}
              onChange={onChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold mb-1" htmlFor="pattern">
              Pattern (Regex)
            </label>
            <input
              id="pattern"
              type="text"
              name="pattern"
              placeholder="e.g. ^\\S+@\\S+\\.\\S+$"
              value={local.pattern}
              onChange={onChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </>
      )}

      {field.type === 'dropdown' && (
        <div className="mb-3">
          <label className="block font-semibold mb-1">Options</label>
          {local.options &&
            local.options.map((opt, idx) => (
              <div key={idx} className="flex mb-1 items-center space-x-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => onOptionChange(idx, e.target.value)}
                  className="flex-grow p-2 border rounded"
                />
                <button
                  onClick={() => removeOption(idx)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  type="button"
                  aria-label="Remove option"
                >
                  &times;
                </button>
              </div>
            ))}
          <button
            onClick={addOption}
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            type="button"
          >
            Add Option
          </button>
        </div>
      )}

      <div className="flex space-x-2 mt-6">
        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="button"
        >
          Save
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          type="button"
        >
          Delete
        </button>
      </div>
    </aside>
  );
}
