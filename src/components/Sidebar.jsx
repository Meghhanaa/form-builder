import React from 'react';
import TemplateLoader from './TemplateLoader';

const fieldTypes = [
  'text',
  'textarea',
  'dropdown',
  'checkbox',
  'date',
];

export default function Sidebar() {
  function onDragStart(e, type) {
    e.dataTransfer.setData('fieldType', type);
  }

  return (
    <aside className="w-1/4 p-4 bg-gray-100 dark:bg-gray-700 h-screen">
      <h2 className="font-bold mb-4 text-lg">Add Fields</h2>
      <ul className="space-y-3">
        {fieldTypes.map((type) => (
          <li
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            className="cursor-move p-2 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </li>
        ))}
      </ul>
      <TemplateLoader/>
    </aside>
  );
}
