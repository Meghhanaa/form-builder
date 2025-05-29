import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';
import FieldRenderer from './FieldRenderer';
import PreviewToggle from './PreviewToggle'; // 👈 New import

export default function Canvas() {
  const {
    fields,
    addFieldAt,
    reorderFields,
    removeField,
    setSelectedFieldId,
    selectedFieldId,
  } = useContext(FormContext);

  // 👇 Add state to manage preview mode width
  const [previewMode, setPreviewMode] = useState({ label: 'Desktop', width: '100%' });

  function onDragStart(e, index) {
    e.dataTransfer.setData('dragIndex', index);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e, dropIndex = fields.length) {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    const dragIndex = Number(e.dataTransfer.getData('dragIndex'));

    if (fieldType) {
      addFieldAt(fieldType, dropIndex);
    } else if (!isNaN(dragIndex) && dragIndex !== dropIndex) {
      reorderFields(dragIndex, dropIndex);
    }
  }

  return (
    <main
      className="w p-6 min-h-screen bg-white dark:bg-gray-900 dark:text-white overflow-auto"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e)}
    >
      <h2 className="font-bold text-xl mb-4">Form Canvas</h2>

      {/* 👇 Add preview mode toggle buttons */}
      <PreviewToggle mode={previewMode} setMode={setPreviewMode} />

      {/* 👇 Wrap canvas contents in a resizable preview container */}
      <div
        className="mx-auto bg-gray-50 dark:bg-gray-800 p-4 border rounded"
        style={{ width: previewMode.width }}
      >
        {fields.length === 0 && (
          <p className="italic text-gray-500 dark:text-gray-400">
            Drag fields here from the sidebar.
          </p>
        )}

        <div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
              onClick={() => setSelectedFieldId(field.id)}
              className={`cursor-move p-2 mb-3 border rounded ${
                selectedFieldId === field.id
                  ? 'border-blue-500 bg-blue-100 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <FieldRenderer field={field} />
              <button
                className="mt-1 text-red-600 hover:text-red-800 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
