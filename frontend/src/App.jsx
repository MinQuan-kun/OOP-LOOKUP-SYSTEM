import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import các trang
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import CuteBot from './components/CuteBot';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        {/* Bọc AuthProvider vào đây để toàn bộ app có thể dùng useAuth */}
        <AuthProvider>
          <Routes>
            {/* Trang chủ */}
            <Route 
              path='/' 
              element={
                <>
                  <HomePage />
                  <CuteBot />
                </>
              }
            />

            {/*Route cho trang Login */}
            <Route 
              path='/login' 
              element={<LoginPage />} 
            />

            {/* Trang 404*/}
            <Route 
              path='*' 
              element={<NotFound />} 
            />
            {/* Trang About */}
            <Route 
                  path='/about' 
                  element={<AboutPage />} 
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App