// src/components/ProgressIndicator.jsx
import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

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
