import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.tsx'; // optional — include if you have it

// Get the root element from index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create the React root and render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
