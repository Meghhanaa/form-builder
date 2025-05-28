// src/components/ProgressIndicator.jsx
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';

const ProgressIndicator = () => {
  const { currentStep, fields } = useContext(FormContext);
  const totalSteps = Math.max(...fields.map((f) => f.step || 1), 1);
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-300 h-2 rounded-full mb-4">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressIndicator;
