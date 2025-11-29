import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các trang
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import CuteBot from './components/CuteBot';


function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App