// src/components/TemplateLoader.jsx
import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

const predefinedTemplates = {
  'Contact Us': [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
      value: '',
      validation: { minLength: 2, maxLength: 50, pattern: '' },
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      value: '',
      validation: { pattern: '' },
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Your message',
      required: true,
      value: '',
      validation: { minLength: 10 },
    },
  ],
  Feedback: [
    {
      id: 'rating',
      type: 'dropdown',
      label: 'Rate your experience',
      options: ['1', '2', '3', '4', '5'],
      value: '',
      required: true,
      validation: {},
    },
    {
      id: 'comments',
      type: 'textarea',
      label: 'Additional Comments',
      placeholder: 'Leave your comments',
      value: '',
      required: false,
      validation: {},
    },
  ],
};

export default function TemplateLoader() {
  const { loadTemplateFromLocal, saveTemplateToLocal } = useContext(FormContext);
  const [templateName, setTemplateName] = useState('');
  const [selectedPredefined, setSelectedPredefined] = useState('');

  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      saveTemplateToLocal(templateName.trim());
      alert(`Template '${templateName}' saved locally!`);
      setTemplateName('');
    }
  };

  const handleLoadPredefined = () => {
    if (selectedPredefined && predefinedTemplates[selectedPredefined]) {
      loadTemplateFromLocal('', predefinedTemplates[selectedPredefined]);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h3 className="text-lg font-semibold mb-2">📁 Template Loader</h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Save Current Form as Template:</label>
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Enter template name"
          className="border px-2 py-1 w-full rounded"
        />
        <button
          className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={handleSaveTemplate}
        >
          Save Template
        </button>
      </div>

      <div>
        <label className="block mb-1 font-medium">Load Predefined Template:</label>
        <select
          className="border px-2 py-1 w-full rounded"
          onChange={(e) => setSelectedPredefined(e.target.value)}
          value={selectedPredefined}
        >
          <option value="">Select template</option>
          {Object.keys(predefinedTemplates).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleLoadPredefined}
        >
          Load Template
        </button>
      </div>
    </div>
  );
}
