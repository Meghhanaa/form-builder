// src/components/FormFiller.jsx
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import StepNavigator from './StepNavigator';
import ProgressIndicator from './ProgressIndicator';

const FormFiller = () => {
  const {
    fields,
    formValues,
    updateFieldValue,
    currentStep,
  } = useContext(FormContext);

  const stepFields = fields.filter((f) => f.step === currentStep);

  return (
    <div className="p-4 border rounded-md shadow-md max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Step {currentStep}</h2>
      <ProgressIndicator />
      {stepFields.map((field) => (
        <div key={field.id} className="my-3">
          <label className="block font-medium">{field.label}</label>
          <input
            type={field.type || 'text'}
            value={formValues[field.id] || ''}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required={field.required}
          />
        </div>
      ))}
      <StepNavigator />
    </div>
  );
};

export default FormFiller;
