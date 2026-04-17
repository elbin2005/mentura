import React from 'react';
import { motion } from 'framer-motion';
import { HiHome, HiAcademicCap, HiFire, HiHeart, HiCamera, HiPlay } from 'react-icons/hi';
import campus1 from '../assets/campus1.jpg';
import campus2 from '../assets/campus2.jpg';
import campus3 from '../assets/campus3.jpg';
import campus4 from '../assets/campus4.jpg';
import campus5 from '../assets/campus5.jpg';
import campus6 from '../assets/campus6.jpg';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import './CampusLifePage.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};

const VideoGalleryItem = ({ item, fadeUp }) => {
    const videoRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handleTogglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);

        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
        };
    }, []);

    return (
        <motion.div
            className={`gallery-item item-${item.id} glass-card video-item`}
            variants={fadeUp}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            <div className="video-wrapper">
                <video 
                    ref={videoRef}
                    src={item.src} 
                    className="gallery-video" 
                    preload="metadata"
                    onClick={handleTogglePlay}
                />
                {!isPlaying && (
                    <div className="video-overlay" onClick={handleTogglePlay}>
                        <HiPlay className="gallery-icon play-icon" />
                        <span>{item.title}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const CampusLifePage = () => {
    return (
        <motion.main
            className="campus-life"
            initial="hidden"
            animate="visible"
        >
            {/* ── HERO ── */}
            <section className="campus-hero">
                <div className="campus-hero__bg" />
                <div className="container campus-hero__content">
                    <motion.div variants={fadeUp} className="section-tag">Home away from Home</motion.div>
                    <motion.h1 variants={fadeUp} className="campus-hero__title">
                        The <span className="gradient-text">Mentaura</span> Experience
                    </motion.h1>
                    <motion.p variants={fadeUp} className="campus-hero__desc">
                        Discover a life where discipline meets comfort. Our residential campus
                        is designed to provide every amenity a CA aspirant needs to stay focused and healthy.
                    </motion.p>
                </div>
            </section>

            {/* ── FACILITIES ── */}
            <section className="facilities">
                <div className="container">
                    <div className="facilities__header">
                        <motion.div variants={fadeUp} className="section-tag">Amenities</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">Facilities <span>We Provide</span></motion.h2>
                    </div>
                    <div className="facilities__grid">
                        {[
                            { title: 'Premium Hostels', icon: <HiHome />, desc: 'Rooms with attached bathrooms, housekeeping, and 24/7 security.' },
                            { title: 'Personal Cubicles', icon: <HiAcademicCap />, desc: 'Silent study zones, digital archives, and high-speed internet availablity.' },
                            { title: 'Nutritious Dining', icon: <HiFire />, desc: 'Hygienic meals prepared with care to keep your energy levels high.' },
                            { title: 'Recline Space', icon: <HiHeart />, desc: 'Regular discussion sessions, physical exercise zones, and psychological counselling.' },
                        ].map((f, i) => (
                            <motion.div key={i} className="facility-card glass-card" variants={fadeUp}>
                                <div className="facility-card__icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY PREVIEW ── */}
            <section className="campus-gallery">
                <div className="container">
                    <div className="gallery__header">
                        <motion.div variants={fadeUp} className="section-tag">Gallery</motion.div>
                        <motion.h2 variants={fadeUp} className="section-title">Life at <span>Campus</span></motion.h2>
                    </div>
                    <div className="gallery__grid">
                        {[
                            { id: 1, src: campus1, type: 'image' },
                            { id: 2, src: campus2, type: 'image' },
                            { id: 3, src: campus3, type: 'image' },
                            { id: 4, src: campus4, type: 'image' },
                            { id: 5, src: campus5, type: 'image' },
                            { id: 6, src: campus6, type: 'image' },
                            { id: 7, src: video1, type: 'video', title: 'Campus Tour 1' },
                            { id: 8, src: video2, type: 'video', title: 'Campus Tour 2' },
                            { id: 9, src: video3, type: 'video', title: 'Campus Tour 3' },
                            { id: 10, src: video4, type: 'video', title: 'Campus Tour 4' },
                        ].map((item) => (
                            item.type === 'video' ? (
                                <VideoGalleryItem key={item.id} item={item} fadeUp={fadeUp} />
                            ) : (
                                <motion.div
                                    key={item.id}
                                    className={`gallery-item item-${item.id} glass-card`}
                                    variants={fadeUp}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    <img src={item.src} alt={`Campus View ${item.id}`} className="gallery-img" />
                                    <div className="gallery-item__overlay">
                                        <HiCamera className="gallery-icon" />
                                        <span></span>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ACTIVITIES ── */}
            <section className="activities">
                <div className="container">
                    <div className="activities__inner glass-card">
                        <div className="activities__content">
                            <motion.div variants={fadeUp} className="section-tag">Beyond Books</motion.div>
                            <motion.h2 variants={fadeUp} className="section-title">Holistic <span>Development</span></motion.h2>
                            <motion.p variants={fadeUp}>
                                We balance intense study hours with recreational breaks. Monthly cultural
                                events, sports tournaments, and group discussions ensure our students
                                remain mentally agile and motivated.
                            </motion.p>
                            <motion.ul variants={staggerContainer}>
                                {['Cultural Meets', 'Sports Zone', 'Group Meditation', 'Guest Lectures'].map((a) => (
                                    <motion.li key={a} variants={fadeUp} className="activity-li">
                                        <span>{a}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <div className="activities__visual">
                            {/* Visual representation of a calendar or activity ring */}
                            <div className="activity-ring">
                                <div className="ring-center">Live</div>
                                <div className="ring-item ring-1">Sleep</div>
                                <div className="ring-item ring-2">Study</div>
                                <div className="ring-item ring-3">Relax</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.main>
    );
};

export default CampusLifePage;
