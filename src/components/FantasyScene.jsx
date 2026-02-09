import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StarsLayer = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            delay: Math.random() * 3
        }));
    }, []);

    return (
        <div className="stars-layer">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        width: star.size,
                        height: star.size,
                        top: star.top,
                        left: star.left,
                        animationDelay: `${star.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

const Moon = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['15vh', '60vh']);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8]);

    return (
        <motion.div
            className="moon"
            style={{
                width: 'clamp(200px, 40vw, 500px)',
                height: 'clamp(200px, 40vw, 500px)',
                right: '10%',
                y,
                scale
            }}
        />
    );
};

const Ghost = ({ delay, startX, startY }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [startY, startY - 200]);
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [startX, startX + 50, startX - 30]);

    return (
        <motion.div
            className="ghost"
            style={{ top: startY, left: startX, x, y }}
            animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, delay }}
        >
            <svg width="60" height="80" viewBox="0 0 60 80">
                <path d="M30 5 C10 5 5 25 5 40 L5 70 Q10 65 15 70 Q20 75 25 70 Q30 65 35 70 Q40 75 45 70 Q50 65 55 70 L55 40 C55 25 50 5 30 5 Z" />
                <circle cx="20" cy="30" r="5" fill="#0a0418" />
                <circle cx="40" cy="30" r="5" fill="#0a0418" />
            </svg>
        </motion.div>
    );
};

const Bat = ({ delay, startX, startY }) => {
    return (
        <motion.div
            className="bat"
            style={{ top: startY, left: startX }}
            animate={{
                x: [0, 300, 600],
                y: [0, -50, 20],
                rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, delay, ease: 'linear' }}
        >
            <svg width="40" height="20" viewBox="0 0 40 20" fill="#1a0a3e">
                <path d="M20 10 Q10 0 0 5 Q5 10 10 8 Q15 15 20 12 Q25 15 30 8 Q35 10 40 5 Q30 0 20 10 Z" />
            </svg>
        </motion.div>
    );
};

const CliffLayer = ({ speed, color, path, zIndex }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

    return (
        <motion.div className="cliff-layer" style={{ y, zIndex, height: '50vh' }}>
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <path d={path} fill={color} />
            </svg>
        </motion.div>
    );
};

const Castle = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <motion.div className="castle" style={{ bottom: '25vh', left: '30%', y }}>
            <svg width="200" height="250" viewBox="0 0 200 250" fill="#1a0a3e">
                {/* Main Tower */}
                <rect x="70" y="50" width="60" height="200" />
                {/* Tower Top */}
                <polygon points="60,50 100,0 140,50" />
                {/* Left Tower */}
                <rect x="30" y="100" width="40" height="150" />
                <polygon points="25,100 50,60 75,100" />
                {/* Right Tower */}
                <rect x="130" y="100" width="40" height="150" />
                <polygon points="125,100 150,60 175,100" />
                {/* Windows */}
                <rect x="90" y="80" width="20" height="30" fill="#E91E8C" opacity="0.6" />
                <rect x="90" y="130" width="20" height="30" fill="#00E5CC" opacity="0.4" />
                <rect x="45" y="130" width="15" height="20" fill="#7B2FBF" opacity="0.5" />
                <rect x="140" y="130" width="15" height="20" fill="#7B2FBF" opacity="0.5" />
            </svg>
        </motion.div>
    );
};

const FantasyScene = () => {
    return (
        <>
            <StarsLayer />
            <Moon />

            {/* Ghosts */}
            <Ghost delay={0} startX="10%" startY="30%" />
            <Ghost delay={1.5} startX="80%" startY="40%" />
            <Ghost delay={3} startX="60%" startY="20%" />

            {/* Bats */}
            <Bat delay={0} startX="-5%" startY="15%" />
            <Bat delay={2} startX="-10%" startY="25%" />
            <Bat delay={4} startX="-5%" startY="35%" />

            {/* Cliffs - Far to Near */}
            <CliffLayer
                speed={-50}
                color="#1a0a3e"
                path="M0,400 L0,250 Q200,200 400,280 T800,220 T1200,300 L1440,250 L1440,400 Z"
                zIndex={2}
            />
            <CliffLayer
                speed={-20}
                color="#2d1a5e"
                path="M0,400 L0,300 Q300,250 600,320 T1100,280 L1440,300 L1440,400 Z"
                zIndex={4}
            />
            <CliffLayer
                speed={50}
                color="#4a2a8a"
                path="M0,400 L0,350 Q400,300 700,360 T1440,340 L1440,400 Z"
                zIndex={6}
            />

            <Castle />
        </>
    );
};

export default FantasyScene;
