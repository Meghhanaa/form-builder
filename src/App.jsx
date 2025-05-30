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

  // ✅ Save form and prepare ID for sharing
  const handleSaveTemplate = () => {
    const id = Date.now().toString();
    localStorage.setItem(`formTemplate-${id}`, localStorage.getItem('formFields'));
    setFormId(id);
    alert(`✅ Form saved! Share this ID: ${id}`);
  };

  // Load template from predefined or user-saved templates
  const handleLoadTemplate = (id) => {
    let data = null;

    if (id === 'contact-us') {
      // Load predefined template
      const contactUsTemplate = localStorage.getItem('predefinedTemplate-contact-us');
      if (contactUsTemplate) {
        data = contactUsTemplate;
      }
    } else {
      // Load from user-saved template
      data = localStorage.getItem(`formTemplate-${id}`);
    }

    if (data) {
      localStorage.setItem('formFields', data);
      window.location.reload();
    } else {
      alert('❌ Template not found!');
    }
  };

  // Open Form Filler in new tab
  const handleOpenFiller = () => {
    if (!formId) {
      alert('❗ Please save the form first to get a Form ID!');
      return;
    }
    window.open(`/form/fill/${formId}`, '_blank');
  };

  // Open Submission Viewer in new tab
  const handleViewSubmissions = () => {
    if (!formId) {
      alert('❗ Please save the form first to view submissions!');
      return;
    }
    window.open(`/form/${formId}/submissions`, '_blank');
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
                className="border p-2 rounded text-sm text-white bg-gray-800"
              >
                <option value="" className="bg-black text-white">Load Template</option>
                <option value="contact-us" className="bg-black text-white">Contact Us</option>
              </select>

              {/* Save Template Button */}
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                Save Template
              </button>

              {/* Form Filler Button */}
              <button
                onClick={handleOpenFiller}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
              >
                Form Filler View
              </button>

              {/* View Submissions Button */}
              <button
                onClick={handleViewSubmissions}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
              >
                View Submissions
              </button>
            </div>

            {/* Theme & Preview Toggles */}
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              {/* <PreviewToggle modes={modes} setModes={setModes} /> */}
            </div>
          </div>

          {/* Form Progress & Canvas */}
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
