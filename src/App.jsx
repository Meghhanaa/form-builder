import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';
import { FormProvider } from './context/FormContext';
import StepNavigator from './components/StepNavigator';
import ProgressIndicator from './components/ProgressIndicator';
import PreviewToggle from './components/PreviewToggle';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [modes, setModes] = useState(false);
  const [formId, setFormId] = useState(''); // For shareable Form ID

  // Save current form structure to localStorage with a unique ID
  const handleSaveTemplate = () => {
    const id = Date.now().toString();
    localStorage.setItem(`formTemplate-${id}`, localStorage.getItem('formFields'));
    setFormId(id);
    alert(`Form saved! Share this ID: ${id}`);
  };

  // Load template from predefined or user-saved templates
  const handleLoadTemplate = (id) => {
    const data = localStorage.getItem(`formTemplate-${id}`);
    if (data) {
      localStorage.setItem('formFields', data);
      window.location.reload();
    } else {
      alert('Template not found!');
    }
  };

  // Open FormFiller in a new tab using the form ID
  const handleOpenFiller = () => {
    if (!formId) {
      alert('Please save the form first to get a Form ID!');
      return;
    }
    window.open(`/form/fill/${formId}`, '_blank');
  };

  return (
    <FormProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 border-b">
            <div className="flex gap-3 items-center">
              {/* Load Template Dropdown */}
              <select
                onChange={(e) => handleLoadTemplate(e.target.value)}
                className="border p-2 rounded text-sm"
              >
                <option value="">Load Template</option>
                <option value="contact-us">Contact Us</option>
              </select>

              {/* Save Template Button */}
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                Save Template
              </button>

              {/* Open Filler View Button */}
              <button
                onClick={handleOpenFiller}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
              >
                Form Filler View
              </button>
            </div>

            {/* Theme & Preview Toggles */}
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <PreviewToggle modes={modes} setModes={setModes} />
            </div>
          </div>

          {/* Form Progress & Canvas Area */}
          <ProgressIndicator />
          <div className="p-4 max-w-5xl mx-auto w-full">
            <Canvas modes={modes} />
            <StepNavigator />
          </div>
        </div>

        <FieldEditor />
      </div>
    </FormProvider>
  );
}
