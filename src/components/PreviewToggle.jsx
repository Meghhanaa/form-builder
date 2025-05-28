import React from 'react';

const modes = [
  { label: 'Desktop', width: '100%' },
  { label: 'Tablet', width: '768px' },
  { label: 'Mobile', width: '375px' },
];

export default function PreviewToggle({ mode, setMode }) {
  return (
    <div className="flex space-x-2 mb-4">
      {modes.map((m) => (
        <button
          key={m.label}
          onClick={() => setMode(m)}
          className={`px-3 py-1 rounded border ${
            mode?.label === m.label
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
