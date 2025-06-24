
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log('🚀 main.tsx: Starting application');

try {
  const rootElement = document.getElementById('root');
  console.log('🔍 main.tsx: Root element found:', !!rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);
  console.log('🔍 main.tsx: React root created successfully');
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  
  console.log('✅ main.tsx: Application rendered successfully');
} catch (error) {
  console.error('❌ main.tsx: Failed to start application:', error);
  
  // Fallback error display
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;">
        <div style="text-align: center; padding: 2rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; max-width: 400px;">
          <h1 style="color: #dc2626; margin-bottom: 1rem;">Application Failed to Load</h1>
          <p style="color: #6b7280; margin-bottom: 1rem;">There was an error starting the application.</p>
          <button onclick="window.location.reload()" style="background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
}
