import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import './Footer.css';
import { FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__top-line" />
            <div className="footer__glow" />
            <div className="container footer__inner">
                {/* Brand */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo-wrap">
                        <img src="/logo.png" alt="Mentaura" className="footer__logo" />
                        <div>
                            <div className="footer__brand-name">MENTAURA</div>
                            <div className="footer__brand-sub">CA Residential Campus</div>
                        </div>
                    </Link>
                    <p className="footer__brand-desc">
                        Committed to Your Success — shaping India's finest Chartered Accountants
                        through excellence, discipline, and care.
                    </p>
                    <div className="footer__socials">
                        {[
                            { icon: <FaInstagram />, href: 'https://www.instagram.com/mentaura_ca?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
                            { icon: <FaFacebookF />, href: 'https://www.facebook.com/share/1CYyxoAGhg/', label: 'Facebook' },
                            { icon: <FaWhatsapp />, href: 'https://wa.me/+91 6282955052', label: 'Whatsapp' },
                            { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/mentaura-ca-residential-campus-88857439b/', label: 'LinkedIn' },
                        ].map((s) => (
                            <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Quick Links</h4>
                    <ul className="footer__links">
                        {[
                            { label: 'Home', to: '/' },
                            { label: 'About Us', to: '/about' },
                            { label: 'Campus Life', to: '/campus-life' },
                            { label: 'Contact', to: '/contact' },
                        ].map((l) => (
                            <li key={l.to}>
                                <Link to={l.to} className="footer__link">{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Programs */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Programs</h4>
                    <ul className="footer__links">
                        {['CA Intermediate', 'CA Final', 'Crash Courses'].map((p) => (
                            <li key={p}>
                                <a href="#" className="footer__link">{p}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Contact Us</h4>
                    <ul className="footer__contacts">
                        <li>
                            <HiLocationMarker className="footer__contact-icon" />
                            <span>Mentaura Campus, Vazhakulam, Ernakulam, Kerala</span>
                        </li>
                        <li>
                            <HiPhone className="footer__contact-icon" />
                            <a href="tel:+91 6282955052" className="footer__link">+91 6282955052</a>
                        </li>
                        <li>
                            <HiMail className="footer__contact-icon" />
                            <a href="mailto:mentauraca@gmail.com" className="footer__link">mentauraca@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span className="footer__copy">
                        © {new Date().getFullYear()} Mentaura CA Residential Campus. All rights reserved.
                    </span>
                    <span className="footer__tagline">Committed to Your Success</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
