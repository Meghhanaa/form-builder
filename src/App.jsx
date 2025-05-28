// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Canvas from './components/Canvas';
// import FieldEditor from './components/FieldEditor';
// import { FormProvider } from './context/FormContext';

// export default function App() {
//   const [modes, setModes] = useState(false);

//   return (
//     <FormProvider>
//       <div className="flex h-screen">
//         <Sidebar />
//         <Canvas />
//         <FieldEditor />
//       </div>
//       <div className="fixed bottom-4 right-4">
//         <button
//           onClick={() => setModes((p) => !p)}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           {modes ? 'Edit Mode' : 'Preview Mode'}
//         </button>
//       </div>
//     </FormProvider>
//   );
// }


import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';
import { FormProvider } from './context/FormContext';
import StepNavigator from './components/StepNavigator'; // 🆕 Multi-step form support
import ProgressIndicator from './components/ProgressIndicator'; // 🆕 Visual progress bar
import PreviewToggle from './components/PreviewToggle'; // 🆕 Preview toggle
import ThemeToggle from './components/ThemeToggle'; // 🆕 Optional dark/light theme
import FormFiller from './components/FormFiller'; // 🆕 Form ID-based public view

// const defaultMode = { label: 'Desktop', width: '100%' };

export default function App() {
  const [modes, setModes] = useState(false);
  const [showFillerView, setShowFillerView] = useState(false); // 🆕 Toggle between builder and filler
  const [formId, setFormId] = useState(''); // 🆕 For shareable Form ID

  const handleSaveTemplate = () => {
    const id = Date.now().toString(); // simplistic ID
    localStorage.setItem(`formTemplate-${id}`, localStorage.getItem('formFields'));
    setFormId(id);
    alert(`Form saved! Share this ID: ${id}`);
  };

  const handleLoadTemplate = (id) => {
    const data = localStorage.getItem(`formTemplate-${id}`);
    if (data) {
      localStorage.setItem('formFields', data);
      window.location.reload();
    } else {
      alert('Template not found!');
    }
  };

  return (
    <FormProvider>
      <div className="flex h-screen">
        {!showFillerView ? (
          <>
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-auto">
              <div className="flex justify-between p-2 bg-gray-100">
                <div className="flex gap-2">
                  {/* 🆕 Template dropdown */}
                  <select
                    onChange={(e) => handleLoadTemplate(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="">Load Template</option>
                    {/* Example: preload a Contact Us template with ID 'contact-us' */}
                    <option value="contact-us">Contact Us</option>
                  </select>
                  <button
                    onClick={handleSaveTemplate}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Save Template
                  </button>
                  <button
                    onClick={() => setShowFillerView(true)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Form Filler View
                  </button>
                </div>
                <div className="flex gap-2">
                  <ThemeToggle />
                  <PreviewToggle
                    modes={modes}
                    setModes={setModes}
                  />
                </div>
              </div>
              <ProgressIndicator /> {/* 🆕 Progress bar */}
              <Canvas modes={modes} />
              <StepNavigator /> {/* 🆕 Step control buttons */}
            </div>
            <FieldEditor />
          </>
        ) : (
          <FormFiller formId={formId} /> // 🆕 Form filler public view
        )}
      </div>
    </FormProvider>
  );
}
