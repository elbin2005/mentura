import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import CampusLifePage from './CampusLifePage';
import ContactPage from './ContactPage';

const MainScroller = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (hash) {
            // Hash takes priority (e.g. /#about)
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Scroll to section based on pathname (e.g. /about → #about)
            const sectionId = pathname.replace('/', '') || 'home';
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [hash, pathname]);

    return (
        <div className="main-scroller">
            <section id="home">
                <HomePage />
            </section>
            <section id="about">
                <AboutPage />
            </section>
            <section id="campus-life">
                <CampusLifePage />
            </section>
            <section id="contact">
                <ContactPage />
            </section>
        </div>
    );
};

export default MainScroller;
