import React from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiLightBulb, HiCheckCircle, HiUsers } from 'react-icons/hi';
import './AboutPage.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
};

const AboutPage = () => {
    return (
        <motion.main
            className="about-page"
            initial="hidden"
            animate="visible"
        >
            {/* ── HERO ── */}
            <section className="about-hero">
                <div className="about-hero__bg">
                    <div className="about-hero__gradient" />
                    <div className="about-hero__grid-lines" />
                </div>
                <div className="container about-hero__content">
                    <motion.div variants={fadeUp} className="section-tag">Empowering Aspirants</motion.div>
                    <motion.h1 variants={fadeUp} className="about-hero__title">
                        Our Journey of <span className="gradient-text">Excellence</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="about-hero__desc">
                        Since inception, Mentaura has been dedicated to bridging the gap between
                        hard work and smart success in the Chartered Accountancy journey.
                    </motion.p>
                </div>
            </section>

            {/* ── STORY/MISSION ── */}
            <section className="about-story">
                <div className="container">
                    <div className="about-story__grid">
                        <motion.div
                            className="about-story__image-wrap"
                            variants={fadeUp}
                        >
                            <img src="/logo.png" alt="Mentaura Heritage" className="about-story__img" />
                            <div className="about-story__img-glow" />
                        </motion.div>
                        <motion.div className="about-story__content" variants={staggerContainer}>
                            <motion.h2 variants={fadeUp} className="section-title">The Mentaura <span>Philosophy</span></motion.h2>
                            <motion.p variants={fadeUp} className="about-story__text">
                                At Mentaura, we believe that becoming a CA is not just about clearing exams;
                                it's about developing a professional mindset, discipline, and ethical values.
                                Our residential campus provides the perfect ecosystem for this transformation.
                            </motion.p>
                            <motion.div variants={fadeUp} className="about-story__stats">
                                <div className="about-stat">
                                    <div className="about-stat__val">CA</div>
                                    <div className="about-stat__label">Intermediate</div>
                                </div>
                                <div className="about-stat">
                                    <div className="about-stat__val">CA</div>
                                    <div className="about-stat__label">Final</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── VISION & MISSION ── */}
            <section className="vision-mission">
                <div className="container">
                    <div className="vision-mission__grid">
                        <motion.div className="vision-card glass-card" variants={fadeUp}>
                            <HiLightBulb className="vision-card__icon" />
                            <h3>Our Vision</h3>
                            <p>To create a focused residential ecosystem where aspiring Chartered Accountants achieve academic excellence, professional integrity, and personal discipline</p>
                        </motion.div>
                        <motion.div className="vision-card glass-card" variants={fadeUp}>
                            <HiStar className="vision-card__icon" style={{ color: 'var(--green)' }} />
                            <h3>Our Mission</h3>
                            <p>To provide a distraction-free residential environment designed exclusively for CA preparation,
                                implement structured study systems with measurable performance tracking,
                                cultivate discipline, consistency, and accountability,
                                provide continuous mentorship, mock testing, and exam-oriented training,
                                instill professional ethics aligned with ICAI standards</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CORE VALUES ── */}
            <section className="core-values">
                <div className="container">
                    <div className="core-values__header">
                        <motion.div variants={fadeUp} className="section-tag">Values</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">What Defines <span>Us</span></motion.h2>
                    </div>
                    <div className="core-values__grid">
                        {[
                            { title: 'Academic Rigor', desc: 'A strict but balanced schedule designed for maximum retention.' },
                            { title: 'Personalized Care', desc: 'One-on-one sessions for doubt clearing and psychological support.' },
                            { title: 'Ethical Integrity', desc: 'Fostering a sense of responsibility and ethics in future CAs.' },
                            { title: 'Holistic Wellness', desc: 'Focus on physical health and mental peace alongside studies.' },
                        ].map((v, i) => (
                            <motion.div key={i} className="value-item" variants={fadeUp}>
                                <HiCheckCircle className="value-item__icon" />
                                <div>
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM/FACULTY ── */}
            <section className="team-section">
                <div className="container">
                    <div className="team-header">
                        <motion.div variants={fadeUp} className="section-tag">Experts</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">Our Expert <span>Faculty</span></motion.h2>
                    </div>
                    <div className="team-grid">
                        {[
                            { name: 'CA Jacobkutty Jaison', role: 'Co founder', icon: <HiUsers /> },
                            { name: 'John Joseph ', role: 'Co founder', icon: <HiUsers /> },
                            { name: 'Iwin Johny', role: 'Co founder', icon: <HiUsers /> },
                        ].map((member, i) => (
                            <motion.div key={i} className="team-card glass-card" variants={fadeUp}>
                                <div className="team-card__avatar">{member.icon}</div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.main>
    );
};

export default AboutPage;
