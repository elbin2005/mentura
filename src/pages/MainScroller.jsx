import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import CampusLifePage from './CampusLifePage';
import ContactPage from './ContactPage';

const MainScroller = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash]);

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
