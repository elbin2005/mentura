import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    HiAcademicCap, HiStar, HiLightBulb, HiHome, HiChartBar,
    HiUsers, HiBookOpen, HiArrowRight, HiCheckCircle, HiPlay
} from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';
import './HomePage.css';

/* ── Reusable animated counter ── */
function Counter({ target, suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef();
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Card with tilt effect ── */
function TiltCard({ children, className = '' }) {
    const cardRef = useRef();

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 12;
        const rotY = (x / rect.width) * 12;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    };

    const handleMouseLeave = () => {
        cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    return (
        <div
            ref={cardRef}
            className={`card-tilt ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.1s ease' }}
        >
            {children}
        </div>
    );
}

/* ── Stagger container ── */
const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7 } }
};

/* ──────────────────────────────── */

const HomePage = () => {
    const heroRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Subtle speed
        }
    }, []);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

    return (
        <motion.main
            className="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* ── HERO ── */}
            <section ref={heroRef} className="hero">
                <motion.div className="hero__bg" style={{ y: heroY, scale: heroScale }}>
                    <video
                        ref={videoRef}
                        className="hero__video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/logo.png"
                    >
                        <source src="/bg-video.mp4" type="video/mp4" />
                    </video>
                    <div className="hero__gradient" />
                    <div className="hero__grid-lines" />
                </motion.div>

                {/* Glow blobs */}
                <div className="hero__blob hero__blob--1" />
                <div className="hero__blob hero__blob--2" />
                <div className="hero__blob hero__blob--3" />

                {/* Content */}
                <motion.div className="hero__content container" style={{ opacity: heroOpacity }}>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="hero__text-group"
                    >
                        <motion.div variants={fadeUp} className="section-tag">
                            ✦ CA INTERMEDIATE & FINAL
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="hero__title">
                            Shape Your Future<br />
                            with <span className="gradient-text">Mentaura</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="hero__tagline">
                            Committed to Your Success
                        </motion.p>

                        <motion.div variants={fadeUp} className="hero__actions">
                            <a href="#contact" className="btn-primary hero__btn-main">
                                Begin Your Journey <HiArrowRight />
                            </a>
                            <a href="#about-section" className="btn-secondary">
                                <HiPlay /> Watch Overview
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="hero__scroll"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                    <span className="hero__scroll-line" />
                    <span className="hero__scroll-text">Scroll</span>
                </motion.div>
            </section>

            {/* ── STATS ── */}
            <section className="stats-section">
                <div className="container">
                    <motion.div
                        className="stats-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        {[
                            { value: 12, suffix: 'hr', label: 'Guided & Focused Study', icon: <HiChartBar /> },
                            { value: 24, suffix: '/7', label: 'Guidance & Support', icon: <HiAcademicCap /> },
                            { value: 100, suffix: '%', label: 'Experienced Faculty', icon: <HiStar /> },
                        ].map((stat, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <TiltCard className="stat-card glass-card">
                                    <div className="stat-card__icon">{stat.icon}</div>
                                    <div className="stat-card__value">
                                        <Counter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="stat-card__label">{stat.label}</div>
                                    <div className="stat-card__bar" />
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── ABOUT STRIP ── */}
            <section id="about-section" className="about-strip">
                <div className="container">
                    <div className="about-strip__inner">
                        <motion.div
                            className="about-strip__image-col"
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="about-strip__img-wrap">
                                <img src="/logo.png" alt="Mentaura Campus" className="about-strip__img" />
                                <div className="about-strip__img-glow" />
                                <div className="about-strip__img-badge">
                                    <HiStar className="about-strip__badge-icon" />
                                    <span>Best Option To Achieve Your Dreams</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="about-strip__content"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={fadeUp} className="section-tag">About Mentaura</motion.div>
                            <motion.h2 variants={fadeUp} className="section-title">
                                Where Ambition Meets <span>Excellence</span>
                            </motion.h2>
                            <motion.p variants={fadeUp} className="about-strip__text">
                                Mentaura CA Residential Campus is built on the philosophy that a student's
                                environment directly shapes their success. We provide a fully immersive
                                residential experience with structured academics, holistic wellness, and
                                continuous mentoring — all under one roof.
                            </motion.p>
                            <motion.ul variants={staggerContainer} className="about-strip__features">
                                {[
                                    'Structured daily timetable & study hours',
                                    'Expert faculty with proven track records',
                                    'Digital learning resources & mock tests',
                                    'Wellness programs & recreational time',
                                ].map((item) => (
                                    <motion.li key={item} variants={fadeUp} className="about-strip__feature">
                                        <HiCheckCircle className="about-strip__check" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                            <motion.div variants={fadeUp}>
                                <Link to="/about" className="btn-primary">
                                    Learn More <HiArrowRight />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="features-header"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeUp} className="section-tag">Why Choose Us</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">
                            Everything You Need to <span>Succeed</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        className="features-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {[
                            {
                                icon: <HiAcademicCap />,
                                title: 'Expert-Led Academics',
                                desc: 'Learn from distinguished faculty, many of whom are CA rank holders and practicing professionals.',
                                color: 'var(--orange)',
                            },
                            {
                                icon: <HiHome />,
                                title: 'Residential Comfort',
                                desc: 'Premium hostel facilities — AC Cubicle facility, nutritious meals, and a calm study environment around the clock.',
                                color: 'var(--green)',
                            },
                            {
                                icon: <HiLightBulb />,
                                title: 'Smart Learning Tools',
                                desc: 'Group discusssions areas, Wifi Facility, Distraction free environment, and regular mock test series.',
                                color: 'var(--orange)',
                            },
                            {
                                icon: <HiBookOpen />,
                                title: 'Structured Schedule',
                                desc: 'A balanced daily timetable blending lecture hours, self-study, breaks, Controlled Mobile phone usage and recreational activities.',
                                color: 'var(--green)',
                            },
                            {
                                icon: <HiUsers />,
                                title: 'Peer Community',
                                desc: 'Study alongside driven, like-minded CA aspirants in a collaborative and competitive environment.',
                                color: 'var(--orange)',
                            },
                            {
                                icon: <HiChartBar />,
                                title: 'Performance Tracking',
                                desc: 'Regular assessments, detailed report cards, and one-on-one faculty sessions to track every student.',
                                color: 'var(--green)',
                            },
                        ].map((feat, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <TiltCard className="feature-card glass-card">
                                    <div className="feature-card__icon-wrap" style={{ '--accent': feat.color }}>
                                        <div className="feature-card__icon">{feat.icon}</div>
                                    </div>
                                    <h3 className="feature-card__title">{feat.title}</h3>
                                    <p className="feature-card__desc">{feat.desc}</p>
                                    <div className="feature-card__shine" />
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            {/*<section className="testimonials-section">
                <div className="container">
                    <motion.div
                        className="testimonials-header"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeUp} className="section-tag">Student Stories</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">
                            Voices of Our <span>Alumni</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        className="testimonials-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {[
                            {
                                name: 'Arjun Sharma',
                                rank: 'CA Final AIR 14',
                                text: 'Mentaura gave me the discipline, environment, and mentorship I needed. The faculty went above and beyond every single day.',
                                avatar: 'A',
                            },
                            {
                                name: 'Priya Nair',
                                rank: 'CA Inter AIR 7',
                                text: "The residential setup completely changed how I studied. I could focus 100% on my preparation without any distractions at home.",
                                avatar: 'P',
                            },
                            {
                                name: 'Rahul Mehta',
                                rank: 'CA Final AIR 31',
                                text: 'From mock tests to counselling sessions — everything was top-notch. I highly recommend Mentaura to every serious CA aspirant.',
                                avatar: 'R',
                            },
                        ].map((t, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <TiltCard className="testimonial-card glass-card">
                                    <FaQuoteLeft className="testimonial-card__quote" />
                                    <p className="testimonial-card__text">{t.text}</p>
                                    <div className="testimonial-card__author">
                                        <div className="testimonial-card__avatar">{t.avatar}</div>
                                        <div>
                                            <div className="testimonial-card__name">{t.name}</div>
                                            <div className="testimonial-card__rank">{t.rank}</div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            */}

            {/* ── CTA BANNER ── */}
            <section className="cta-section">
                <div className="cta-section__bg" />
                <div className="cta-section__blob cta-section__blob--1" />
                <div className="cta-section__blob cta-section__blob--2" />
                <motion.div
                    className="container cta-section__inner"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeUp} className="section-tag">Limited Seats Available</motion.div>
                    <motion.h2 variants={fadeUp} className="cta-section__title">
                        Ready to Start Your<br />CA Journey with Mentaura?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="cta-section__desc">
                        Every great CA journey begins with the right foundation.
                        Seats fill fast — secure yours today.
                    </motion.p>
                    <motion.div variants={fadeUp} className="cta-section__actions">
                        <a href="#contact" className="btn-primary cta-section__btn">
                            Apply Now <HiArrowRight />
                        </a>
                        <a href="#campus-life" className="btn-secondary">
                            Explore Campus
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </motion.main>
    );
};

export default HomePage;
