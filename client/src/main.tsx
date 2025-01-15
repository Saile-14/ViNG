import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from './components/theme-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Signup from './pages/Signup.tsx';
import MyProfile  from './pages/MyProfile.tsx';
import Feed  from './pages/Feed.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Home from './pages/Home.tsx';
import Navbar from './components/ui/Navbar.tsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  

  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />  
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
