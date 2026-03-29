import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import './ContactPage.css';
import { FaWhatsapp } from 'react-icons/fa6';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/mentauraca@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    _subject: `New Contact from ${formData.name} - Mentaura`,
                    _template: "table"
                })
            });

            if (response.ok) {
                alert('Thank you for contacting Mentaura! We will get back to you shortly.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Oops! Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.main
            className="contact-page"
            initial="hidden"
            animate="visible"
        >
            {/* ── HERO ── */}
            <section className="contact-hero">
                <div className="container">
                    <motion.div variants={fadeUp} className="section-tag">Reach Out</motion.div>
                    <motion.h1 variants={fadeUp} className="contact-hero__title">
                        Connect with <span className="gradient-text">Mentaura</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="contact-hero__desc">
                        Have questions about our programs or campus? Our team is here to help you
                        on your journey to success.
                    </motion.p>
                </div>
            </section>

            {/* ── CONTACT GRID ── */}
            <section className="contact-grid-sec">
                <div className="container">
                    <div className="contact-grid">
                        {/* Info Col */}
                        <motion.div className="contact-info" variants={fadeUp}>
                            <div className="contact-info__item">
                                <div className="contact-icon-wrap"><HiLocationMarker /></div>
                                <div>
                                    <h4>Visit Us</h4>
                                    <p>Mentaura CA Residential Campus,<br /> Vazhakulam, Ernakulam, Kerala</p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <div className="contact-icon-wrap"><HiPhone /></div>
                                <div>
                                    <h4>Call Us</h4>
                                    <p>+91 6282955052</p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <div className="contact-icon-wrap"><HiMail /></div>
                                <div>
                                    <h4>Email Us</h4>
                                    <p>mentauraca@gmail.com</p>
                                </div>
                            </div>

                            <div className="contact-socials">
                                <h4>Follow Us</h4>
                                <div className="social-links">
                                    <a href="https://www.instagram.com/mentaura_ca?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram /></a>
                                    <a href="https://www.facebook.com/share/1CYyxoAGhg/"><FaFacebookF /></a>
                                    <a href="https://wa.me/+91 6282955052"><FaWhatsapp /></a>
                                    <a href="https://www.linkedin.com/in/mentaura-ca-residential-campus-88857439b/"><FaLinkedinIn /></a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Col */}
                        <motion.div className="contact-form-col" variants={fadeUp}>
                            <form className="contact-form glass-card" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about your requirements..."
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary form-submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : <>Send Message <HiArrowRight /></>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── MAP SECTION ── */}
            <section className="map-section">
                <div className="container">
                    <div className="map-container glass-card">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1774351980314!2d76.659033874792!3d9.919205090182606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07c313f1ea3b0f%3A0x9677e0a9961120f1!2sMentaura%20CA%20Residential%20Campus!5e0!3m2!1sen!2sin!4v1741021481180!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mentaura Campus Map"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="faq-section">
                <div className="container">
                    <div className="faq-header">
                        <motion.div variants={fadeUp} className="section-tag">FAQ</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">Common <span>Questions</span></motion.h2>
                    </div>
                    <div className="faq-grid">
                        {[
                            { q: 'Is the residential campus mandatory?', a: 'Yes, our model is built on an immersive residential environment for maximum focus.' },
                            { q: 'What is the teacher-to-student ratio?', a: 'We maintain a strict 1:20 ratio to ensure personalized mentoring for all.' },
                            { q: 'Are admissions open for mid-term?', a: 'We generally admit in cohorts, but please contact us for any exceptional cases.' },
                        ].map((faq, i) => (
                            <motion.div key={i} className="faq-item glass-card" variants={fadeUp}>
                                <h4>{faq.q}</h4>
                                <p>{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.main>
    );
};

export default ContactPage;
