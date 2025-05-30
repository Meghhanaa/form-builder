import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../context/FormContext';
import ProgressIndicator from './ProgressIndicator';
import { useParams } from 'react-router-dom';

export default function FormFiller() {
  const {
    fields,
    updateFieldValue,
    validateFieldValue,
    resetForm,
    setFields,
    submitForm, // ✅ include this
  } = useContext(FormContext);

  const [errors, setErrors] = useState({});

  const { formId } = useParams();

  // ✅ Load form by ID on mount
  useEffect(() => {
    const saved = localStorage.getItem(`formTemplate-${formId}`);
    if (saved) {
      setFields(JSON.parse(saved));
    }
  }, [formId, setFields]);

  const handleChange = (id, value) => {
    updateFieldValue(id, value);
  };

  const handleCheckboxChange = (id, checked) => {
    updateFieldValue(id, checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;

    fields.forEach((field) => {
      const errs = validateFieldValue(field);
      if (errs.length > 0) {
        newErrors[field.id] = errs;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      submitForm(formId, fields); // ✅ Pass formId here
      alert('✅ Form submitted successfully!');
      resetForm();
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <ProgressIndicator />
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 tracking-wide">
          📝 Fill the Form
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {fields.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No fields added yet. Please add some fields.
            </p>
          )}

          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-gray-800 font-semibold text-base">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === 'text' || field.type === 'email' || field.type === 'date'|| field.type === 'number' ? (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  value={field.value || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                />
              ) : field.type === 'checkbox' ? (
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => handleCheckboxChange(field.id, e.target.checked)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className="text-gray-700">Check if applicable</span>
                </label>
              ) : field.type === 'dropdown' ? (
                <select
                  value={field.value || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                >
                  <option value="">-- Select --</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-500">Unsupported field type: {field.type}</p>
              )}

              {field.helpText && (
                <p className="text-sm text-gray-500 italic">{field.helpText}</p>
              )}

              {errors[field.id] && (
                <ul className="text-red-600 text-sm list-disc list-inside">
                  {errors[field.id].map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {fields.length > 0 && (
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
              >
                🚀 Submit Form
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
