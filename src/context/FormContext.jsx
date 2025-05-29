import React, { createContext, useState, useEffect } from 'react'; 
import { nanoid } from 'nanoid';

export const FormContext = createContext();


export function FormProvider({ children }) {
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem('formFields');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); 
  
  useEffect(() => {
    localStorage.setItem('formFields', JSON.stringify(fields));
  }, [fields]);

  function addFieldAt(type, index) {
    const newField = {
      id: nanoid(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: '',
      required: false,
      helpText: '',
      options: type === 'dropdown' ? ['Option 1', 'Option 2'] : [],
      value: type === 'checkbox' ? false : '',
      validation: {
        minLength: null,
        maxLength: null,
        pattern: '',
      },
    };
    setFields((prev) => {
      const copy = [...prev];
      copy.splice(index, 0, newField);
      return copy;
    });
    setSelectedFieldId(newField.id);
  }

  function removeField(id) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  }

  function reorderFields(fromIndex, toIndex) {
    setFields((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  }

  function updateField(id, updatedProps) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedProps } : f))
    );
  }

  function updateFieldValue(id, newValue) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value: newValue } : f))
    );
  }

  function validateFieldValue(field) {
    const errors = [];
    const val = field.value;
    if (field.required) {
      if (
        field.type === 'checkbox' &&
        (val === false || val === undefined || val === null)
      ) {
        errors.push('This field is required.');
      } else if (
        (typeof val === 'string' && val.trim() === '') ||
        val === undefined ||
        val === null
      ) {
        errors.push('This field is required.');
      }
    }
    if (
      field.validation.minLength &&
      typeof val === 'string' &&
      val.length < field.validation.minLength
    ) {
      errors.push(`Minimum length is ${field.validation.minLength}.`);
    }
    if (
      field.validation.maxLength &&
      typeof val === 'string' &&
      val.length > field.validation.maxLength
    ) {
      errors.push(`Maximum length is ${field.validation.maxLength}.`);
    }
    if (field.validation.pattern) {
      try {
        const regex = new RegExp(field.validation.pattern);
        if (typeof val === 'string' && !regex.test(val)) {
          errors.push('Input does not match required pattern.');
        }
      } catch (e) {
        // invalid regex pattern - ignore
      }
    }
    return errors;
  }

  // 👉 New function added to reset all form fields and selected field ID
  function resetForm() {
    setFields([]);
    setSelectedFieldId(null);
  }

  return (
    <FormContext.Provider
      value={{
        fields,
        selectedFieldId,
        setSelectedFieldId,
        addFieldAt,
        removeField,
        reorderFields,
        updateField,
        updateFieldValue,
        validateFieldValue,
        resetForm, // 👉 Also exposed in the context value
        currentStep, // ⬅️ NEW
        setCurrentStep // ⬅️ NEW
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
