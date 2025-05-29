import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';

const StepNavigator = () => {
  const {
    fields,
    validateFieldValue,
    currentStep,
    setCurrentStep
  } = useContext(FormContext);

  const stepFields = fields.filter((f) => f.step === undefined || f.step === currentStep);

  const isLastStep = fields.some((f) => f.step !== undefined)
    ? !fields.some((f) => f.step > currentStep)
    : true;

  const handleNext = () => {
    const allValid = stepFields.every((field) => {
      const errors = validateFieldValue(field);
      return errors.length === 0;
    });

    if (!allValid) {
      alert('Please fix validation errors before continuing.');
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={handleBack}
        disabled={currentStep === 0}
        className="px-6 py-2 text-sm font-medium rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
      >
        Back
      </button>

      <button
        onClick={handleNext}
        className="px-6 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLastStep ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default StepNavigator;
