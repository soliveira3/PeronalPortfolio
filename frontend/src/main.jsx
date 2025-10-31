import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import { Toaster } from "react-hot-toast"
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <App />
            <Toaster />
        </BrowserRouter>
    </StrictMode>,
);