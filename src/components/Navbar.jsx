import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
    { label: 'Home', id: 'home', to: '/#home' },
    { label: 'About Us', id: 'about', to: '/#about' },
    { label: 'Campus Life', id: 'campus-life', to: '/#campus-life' },
    { label: 'Contact', id: 'contact', to: '/#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observers = [];
        const entriesMap = new Map();

        const callback = (entries) => {
            entries.forEach(entry => {
                entriesMap.set(entry.target.id, entry.isIntersecting);
            });

            // Find the first intersecting entry
            for (const link of navLinks) {
                if (entriesMap.get(link.id)) {
                    setActiveSection(link.id);
                    break;
                }
            }
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });

        navLinks.forEach(link => {
            const el = document.getElementById(link.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="navbar__inner">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <img src="/logo.png" alt="Mentaura Logo" className="navbar__logo-img" />
                    <div className="navbar__logo-text">
                        <span className="navbar__logo-name">MENTAURA</span>
                        <span className="navbar__logo-sub">CA Residential Campus</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="navbar__links">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                to={link.to}
                                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                                <span className="navbar__link-underline" />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link to="/contact" className="navbar__cta btn-primary">
                    Enroll Now
                </Link>

                {/* Hamburger */}
                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <Link
                                    to={link.to}
                                    className={`navbar__mobile-link ${activeSection === link.id ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem' }}>
                            Enroll Now
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
