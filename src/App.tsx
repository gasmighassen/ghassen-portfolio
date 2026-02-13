/**
 * Ghassen Gasmi - Cinematic Portfolio
 * Main Application Component
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Header,
  Hero,
  Projects,
  About,
  Services,
  Footer,
  Loader,
} from '@/components';
import { ScrollLines } from '@/components/ScrollLines';
import './styles/global.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
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
            <ScrollLines />
            <Header />
            <main>
              <Hero />
              <Projects />
              <Services />
              <About />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
