import './index.css'

import { StrictMode, useState, createContext, Dispatch, SetStateAction, useEffect } from 'react'
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
import CreatePost from './pages/CreatePost.tsx';
import { useCurrentUser } from './lib/hooks/useCurrentUser.ts';


const queryClient = new QueryClient();

export interface AuthContextType {
  signedIn: boolean;
  setSignedIn: Dispatch<SetStateAction<boolean>>;
  currentUser: number | null;
  setCurrentUser: Dispatch<SetStateAction<number | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(  undefined)

function App() {

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<number | null>(null);
  const { data: user, refetch } = useCurrentUser();

  const authValue: AuthContextType = {
    signedIn,
    setSignedIn,
    currentUser,
    setCurrentUser
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSignedIn(true);
      refetch(); 
    }
  }, [refetch]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user.id);
    }
  }, [user]);

  
 

  
  return (
    <AuthContext.Provider value={authValue}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
              <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  

  <StrictMode>
    <App />
  </StrictMode>,
)
