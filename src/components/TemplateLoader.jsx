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
  const {
    saveTemplateToLocal,
    loadTemplateFromLocal,
  } = useContext(FormContext);

  const [templateName, setTemplateName] = useState('');
  const [selectedPredefined, setSelectedPredefined] = useState('');
  const [selectedSavedTemplate, setSelectedSavedTemplate] = useState('');
  const [savedTemplates, setSavedTemplates] = useState(() => {
    // Load all saved template keys from localStorage on mount
    return Object.keys(localStorage)
      .filter((key) => key.startsWith('formTemplate-'))
      .map((key) => key.replace('formTemplate-', ''));
  });

  // Save current form as named template
  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Please enter a valid template name');
      return;
    }
    saveTemplateToLocal(templateName.trim());
    alert(`Template '${templateName.trim()}' saved locally!`);
    setTemplateName('');
    setSavedTemplates((prev) => [...prev, templateName.trim()]);
  };

  // Load predefined template from memory
  const handleLoadPredefined = () => {
    if (selectedPredefined && predefinedTemplates[selectedPredefined]) {
      loadTemplateFromLocal('', predefinedTemplates[selectedPredefined]);
    }
  };

  // Load saved template from localStorage
  const handleLoadSavedTemplate = () => {
    if (selectedSavedTemplate) {
      loadTemplateFromLocal(selectedSavedTemplate);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">📁 Template Loader</h3>

      {/* Save current form as template */}
      <div className="mb-6">
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

      {/* Load predefined template */}
      <div className="mb-6">
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

      {/* Load saved template */}
      <div>
        <label className="block mb-1 font-medium">Load Saved Template:</label>
        <select
          className="border px-2 py-1 w-full rounded"
          onChange={(e) => setSelectedSavedTemplate(e.target.value)}
          value={selectedSavedTemplate}
        >
          <option value="">Select saved template</option>
          {savedTemplates.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleLoadSavedTemplate}
        >
          Load Saved Template
        </button>
      </div>
    </div>
  );
}
