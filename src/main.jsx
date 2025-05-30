import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FormFiller from './components/FormFiller';
import SubmissionsViewer from './components/SubmissionsViewer';
import { FormProvider } from './context/FormContext'; // ✅ import your context
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/form/fill/:formId"
          element={
            <FormProvider> {/* ✅ wrap this */}
              <FormFiller />
            </FormProvider>
          }
        />
        <Route path="/form/:formId/submissions" element={<SubmissionsViewer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
