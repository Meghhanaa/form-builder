// src/components/FormFiller.jsx
import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';
import StepNavigator from './StepNavigator';
import ProgressIndicator from './ProgressIndicator';

const FormFiller = () => {
  // Remove: const [currentStep, setCurrentStep] = useState(0);

const { fields, updateFieldValue, currentStep } = useContext(FormContext);


  // const [currentStep, setCurrentStep] = useState(0);

  const stepFields = fields.filter((f) => f.step === undefined || f.step === currentStep);

  return (
    <div className="bg-white dark:bg-gray-900 px-10 py-8 rounded-2xl shadow-2xl max-w-4xl mx-auto transition-all duration-300">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
        Fill Out the Form
      </h2>

      <ProgressIndicator />

      <form className="space-y-8 mt-8">
        {stepFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                value={field.value || ''}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => updateFieldValue(field.id, e.target.value)}
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : field.type === 'dropdown' ? (
              <select
                value={field.value || ''}
                onChange={(e) => updateFieldValue(field.id, e.target.value)}
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {field.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => updateFieldValue(field.id, e.target.checked)}
                  className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 text-lg">
                  {field.placeholder || 'Check this box'}
                </span>
              </div>
            ) : (
              <input
                type={field.type || 'text'}
                value={field.value || ''}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => updateFieldValue(field.id, e.target.value)}
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {field.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {field.helpText}
              </p>
            )}
          </div>
        ))}
      </form>

      <div className="mt-10">
        <StepNavigator />
      </div>
    </div>
  );
};

export default FormFiller;
