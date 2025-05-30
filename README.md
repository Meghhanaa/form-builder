🧩 React Form Builder

A powerful and interactive Form Builder built with React + Vite, Tailwind CSS, and Context API, supporting drag-and-drop form creation, multi-step functionality, real-time preview, theming, and localStorage-based persistence.

🔗 Live Demo
🌐 Live Site
📦 GitHub Repository
🎥 Video Walkthrough

📌 Features
🛠️ Core Features
Drag & Drop Form Builder: Easily add and reorder fields with a visual interface.

Field Configuration: Customize label, placeholder, required status, help text, options, etc.

Supported Field Types: Text, Textarea, Dropdown, Checkbox, Date, Email, Number.

Live Preview: Real-time form rendering and validation feedback.

Multi-Step Forms: Forms divided into steps with navigation and validation per step.

Progress Indicator: Visual step indicator for form filler.

Form Validation:

Required fields

Min/Max length

Regex pattern matching (email, phone, etc.)

🧩 Templates & Persistence
Predefined Templates (e.g., Contact Us)

Save/Load Templates:

Save templates to localStorage

Load from predefined or saved templates

🖼️ Device Preview Modes
Switch between Desktop, Tablet, and Mobile view for responsive previews.

🔗 Shareable Forms
Generate a Form ID after creation.

Shareable URL for others to fill the form.

Public Form Filler View: Loads form by ID.

Responses saved and linked to form ID.

⭐ Bonus Features (Implemented)
✅ Auto-save: Forms auto-save to localStorage during editing.

✅ Submitted Responses: View all submissions per form by form ID.

✅ Dark/Light Mode: Toggle between dark and light themes.

✅ Undo/Redo: Track and reverse changes in the form editor.

🚀 Tech Stack
Frontend: React (Vite)

State Management: Context API

Styling: Tailwind CSS

Routing: React Router DOM

Form Persistence: localStorage

🧑‍💻 Getting Started
🔧 Installation

git clone (https://github.com/Meghhanaa/form-builder)
cd form-builder
npm install
npm run dev

🧪 Test Locally
Build a form in the builder.

Save it or preview it.

Use the shared URL to fill the form.

View submissions using /form/:formId/submissions.
