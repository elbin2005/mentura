import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CampusLifePage from './pages/CampusLifePage';
import ContactPage from './pages/ContactPage';
import MainScroller from './pages/MainScroller';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="noise-overlay" />
      <div className="page-wrapper">
        <Navbar />
        <AnimatePresence mode="wait">
          19:           <Routes>
            20:             <Route path="/" element={<MainScroller />} />
            21:             <Route path="/about" element={<MainScroller />} />
            22:             <Route path="/campus-life" element={<MainScroller />} />
            23:             <Route path="/contact" element={<MainScroller />} />
            24:           </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
