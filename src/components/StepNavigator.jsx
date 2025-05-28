// src/components/StepNavigator.jsx
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';

const StepNavigator = () => {
  const {
    currentStep,
    setCurrentStep,
    fields,
    validateFieldValue,
  } = useContext(FormContext);

  const totalSteps = Math.max(...fields.map((f) => f.step || 1), 1);

  const handleNext = () => {
    const stepFields = fields.filter((f) => f.step === currentStep);
    const errors = stepFields.flatMap(validateFieldValue);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    setCurrentStep(Math.min(currentStep + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  return (
    <div className="flex justify-between mt-4">
      <button onClick={handleBack} disabled={currentStep === 1}>
        Back
      </button>
      <button onClick={handleNext} disabled={currentStep === totalSteps}>
        Next
      </button>
    </div>
  );
};

export default StepNavigator;
