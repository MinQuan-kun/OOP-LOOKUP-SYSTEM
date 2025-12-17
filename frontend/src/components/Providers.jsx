'use client';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast'; // 1. Import Toaster

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#ecfdf5', 
              color: '#047857',     
              border: '1px solid #a7f3d0'
            },
            iconTheme: {
              primary: '#059669',
              secondary: '#FFFAEE',
            },
          },
          error: {
            style: {
              background: '#fef2f2', 
              color: '#b91c1c',     
              border: '1px solid #fecaca'
            },
            iconTheme: {
              primary: '#dc2626',
              secondary: '#FFFAEE',
            },
          },
        }}
      />
    </AuthProvider>
  );
}