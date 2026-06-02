import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from './app/theme/ThemeProvider.tsx';

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>
)
