import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import Signup from './pages/Signup.tsx';
import Navbar from './components/ui/Navbar.tsx';
import AuthSignup from './pages/AuthSignup.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyProfile } from './pages/MyProfile.tsx';
import { Feed } from './pages/Feed.tsx';
import LoginPage from './pages/page.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  

  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Navbar />
        <Routes>
        <Route element={<AuthSignup />} >
            <Route index path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<AuthSignup />} />
            <Route path="/sign-up" element={<Signup/>} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/feed" element={<Feed />} />
          </Route>    
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
