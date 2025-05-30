// components/SubmissionsView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SubmissionsView() {
  const { formId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  // ✅ Load submissions on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`formSubmissions-${formId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSubmissions(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
    }
  }, [formId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">📋 Submitted Responses</h2>

        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions yet for this form.</p>
        ) : (
          <div className="space-y-6">
            {submissions.map((entry, index) => (
              <div
                key={`submission-${index}`}
                className="border p-4 rounded bg-gray-50 shadow-sm"
              >
                <h3 className="font-semibold mb-2 text-lg">Submission #{index + 1}</h3>
                <ul className="space-y-1 text-sm">
                  {entry.map((field) => (
                    <li key={field.id || `${field.label}-${index}`}>
                      <strong>{field.label}:</strong>{' '}
                      {field.type === 'checkbox'
                        ? field.value
                          ? '✔ Yes'
                          : '❌ No'
                        : field.value || '—'}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
