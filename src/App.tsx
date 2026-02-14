/**
 * Ghassen Gasmi - Cinematic Portfolio
 * Main Application Component
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer, Loader } from '@/components';
import { Home, AboutPage } from '@/pages';
import './styles/global.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BrowserRouter>
      {/* Loading screen */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Main content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <main style={{ minHeight: '100vh' }}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
