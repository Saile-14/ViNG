import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import Signup from './pages/Signup.tsx';
import Navbar from './components/ui/Navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
