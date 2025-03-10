import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@flaticon/flaticon-uicons/css/all/all.css";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
