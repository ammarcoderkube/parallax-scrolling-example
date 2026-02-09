import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ========== STARS ==========
const Stars = ({ scrollProgress }) => {
    const stars = useMemo(() => {
        const types = ['small', 'medium', 'large'];
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            type: types[Math.floor(Math.random() * 3)],
            top: Math.random() * 50 + '%',
            left: Math.random() * 100 + '%',
            delay: Math.random() * 5
        }));
    }, []);

    // Stars completely fade out as sun rises
    const opacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.3, 0]);

    return (
        <motion.div className="stars-layer" style={{ opacity }}>
            {stars.map(s => (
                <div
                    key={s.id}
                    className={`star star--${s.type}`}
                    style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
                />
            ))}
        </motion.div>
    );
};

// ========== SUN (Glow only) ==========
const Sun = ({ scrollProgress }) => {
    // Sun rises smoothly into full view during day
    const y = useTransform(scrollProgress, [0, 0.35, 0.55, 0.75, 1], ['-60vh', '-40vh', '10vh', '18vh', '22vh']);
    const opacity = useTransform(scrollProgress, [0, 0.35, 0.5, 1], [0, 0, 1, 1]);
    const scale = useTransform(scrollProgress, [0.45, 0.7, 1], [0.7, 1, 1.15]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: '20%',
                top: 0,
                y,
                opacity,
                scale,
                zIndex: 3
            }}
        >
            {/* Sun Glow Background - Vibrant and colorful */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: 'clamp(350px, 45vw, 600px)',
                    height: 'clamp(350px, 45vw, 600px)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 180, 0, 0.5) 0%, rgba(255, 100, 0, 0.2) 40%, transparent 80%)',
                    filter: 'blur(30px)',
                }}
            />

            {/* Sun Core - Multi-layered for depth */}
            <motion.div
                style={{
                    position: 'relative',
                    width: 'clamp(140px, 20vw, 220px)',
                    height: 'clamp(140px, 20vw, 220px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #FFEB3B, #FF9800)',
                    boxShadow: `
                        0 0 50px 25px rgba(255, 215, 0, 0.6),
                        0 0 100px 50px rgba(255, 140, 0, 0.4),
                        0 0 150px 75px rgba(255, 69, 0, 0.2)
                    `
                }}
            />
        </motion.div>
    );
};

// ========== MOON ==========
const Moon = ({ scrollProgress }) => {
    // Moon stays fully visible at start, then sets smoothly
    const y = useTransform(scrollProgress, [0, 0.2, 0.45, 0.65], ['12vh', '20vh', '70vh', '130vh']);
    const scale = useTransform(scrollProgress, [0, 0.15, 0.4], [1, 1.08, 0.85]);
    const opacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.8, 0]);

    return (
        <motion.div
            className="moon"
            style={{
                width: 'clamp(200px, 32vw, 400px)',
                height: 'clamp(200px, 32vw, 400px)',
                right: '10%',
                top: 0,
                y,
                scale,
                opacity
            }}
        />
    );
};

// ========== REALISTIC BIRDS ==========
const Bird = ({ startY, startX, delay, speed, direction, scrollProgress }) => {
    const opacity = useTransform(scrollProgress, [0, 0.5, 0.65, 1], [0, 0, 1, 1]);

    // Birds move in different directions based on 'direction' prop
    const xBase = useTransform(scrollProgress, [0.5, 1], [startX, startX + (direction * (100 + speed))]);

    // Add some "waver" to the Y position for more realism
    const yWaver = useTransform(scrollProgress, [0.5, 1], [0, Math.sin(delay) * 20]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: `${startY}%`,
                left: 0,
                x: xBase,
                y: yWaver,
                opacity,
                zIndex: 25,
                scaleX: direction // Flip svg if flying left
            }}
        >
            <motion.svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                animate={{
                    scaleY: [1, 0.7, 1],
                }}
                transition={{ duration: 0.4, repeat: Infinity, delay }}
            >
                {/* Bird body */}
                <ellipse cx="20" cy="12" rx="8" ry="4" fill="#2C3E50" />
                {/* Left wing */}
                <motion.path
                    d="M12 12 Q5 4 2 8 Q8 10 12 12"
                    fill="#34495E"
                    animate={{ d: ["M12 12 Q5 4 2 8 Q8 10 12 12", "M12 12 Q5 14 2 10 Q8 12 12 12", "M12 12 Q5 4 2 8 Q8 10 12 12"] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay }}
                />
                {/* Right wing */}
                <motion.path
                    d="M28 12 Q35 4 38 8 Q32 10 28 12"
                    fill="#34495E"
                    animate={{ d: ["M28 12 Q35 4 38 8 Q32 10 28 12", "M28 12 Q35 14 38 10 Q32 12 28 12", "M28 12 Q35 4 38 8 Q32 10 28 12"] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay }}
                />
                {/* Head */}
                <circle cx="28" cy="10" r="3" fill="#2C3E50" />
                {/* Beak */}
                <polygon points="31,10 35,11 31,12" fill="#E67E22" />
            </motion.svg>
        </motion.div>
    );
};

// ========== BIRD FLOCK ==========
const BirdFlock = ({ scrollProgress }) => {
    const birds = useMemo(() => [
        { id: 1, startY: 18, startX: -15, delay: 0, speed: 22, direction: 1 },
        { id: 2, startY: 28, startX: 115, delay: 0.2, speed: 28, direction: -1 },
        { id: 3, startY: 12, startX: -25, delay: 0.4, speed: 20, direction: 1 },
        { id: 4, startY: 24, startX: 125, delay: 0.6, speed: 25, direction: -1 },
    ], []);

    return (
        <>
            {birds.map(bird => (
                <Bird
                    key={bird.id}
                    startY={bird.startY}
                    startX={bird.startX + '%'}
                    delay={bird.delay}
                    speed={bird.speed}
                    direction={bird.direction}
                    scrollProgress={scrollProgress}
                />
            ))}
        </>
    );
};

// ========== CLOUDS ==========
const Cloud = ({ top, left, size, delay, scrollProgress }) => {
    const opacity = useTransform(scrollProgress, [0, 0.45, 0.6, 1], [0, 0, 0.7, 0.9]);
    // Much wider travel distance (0% to 80%)
    const x = useTransform(scrollProgress, [0, 1], ['0%', '80%']);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top,
                left,
                opacity,
                x,
                zIndex: 6
            }}
            animate={{ x: [0, 60, 0] }}
            transition={{ duration: 30, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
            <svg width={size} height={size * 0.5} viewBox="0 0 120 60">
                <ellipse cx="35" cy="42" rx="28" ry="16" fill="rgba(255,255,255,0.7)" />
                <ellipse cx="65" cy="35" rx="35" ry="22" fill="rgba(255,255,255,0.85)" />
                <ellipse cx="95" cy="42" rx="24" ry="14" fill="rgba(255,255,255,0.6)" />
                <ellipse cx="50" cy="25" rx="20" ry="15" fill="rgba(255,255,255,0.75)" />
            </svg>
        </motion.div>
    );
};

// ========== SMALL MOUNTAINS ==========
const Mountain = ({ path, fill, speed, scrollProgress, zIndex = 1 }) => {
    const y = useTransform(scrollProgress, [0, 1], ['0%', `${speed}%`]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '35vh', // Smaller mountains
                y,
                zIndex,
                pointerEvents: 'none'
            }}
        >
            <svg
                viewBox="0 0 1440 300"
                preserveAspectRatio="none"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: 0
                }}
            >
                <path d={path} fill={fill} />
            </svg>
        </motion.div>
    );
};

// ========== CASTLE (Grounded) ==========
const Castle = ({ scrollProgress }) => {
    const y = useTransform(scrollProgress, [0, 1], ['0px', '-50px']);

    return (
        <motion.div
            style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                y,
                zIndex: 15
            }}
        >
            <svg width="280" height="220" viewBox="0 0 280 220">
                {/* Ground base */}
                <rect x="0" y="205" width="280" height="15" fill="#0D0D20" />

                {/* Main Tower */}
                <rect x="100" y="40" width="80" height="180" fill="#0D0D20" />
                <polygon points="90,40 140,0 190,40" fill="#0D0D20" />

                {/* Left Tower */}
                <rect x="25" y="80" width="60" height="140" fill="#0D0D20" />
                <polygon points="15,80 55,35 95,80" fill="#0D0D20" />

                {/* Right Tower */}
                <rect x="195" y="80" width="60" height="140" fill="#0D0D20" />
                <polygon points="185,80 225,35 265,80" fill="#0D0D20" />

                {/* Windows with glow */}
                <rect className="castle-window" x="125" y="70" width="30" height="40" fill="#E91E8C" opacity="0.7" />
                <rect className="castle-window" x="125" y="130" width="30" height="40" fill="#00E5CC" opacity="0.6" style={{ animationDelay: '1s' }} />
                <rect className="castle-window" x="42" y="110" width="25" height="35" fill="#7B2FBF" opacity="0.6" style={{ animationDelay: '0.5s' }} />
                <rect className="castle-window" x="212" y="110" width="25" height="35" fill="#7B2FBF" opacity="0.6" style={{ animationDelay: '1.5s' }} />

                {/* Door */}
                <path d="M120,220 L120,175 Q140,155 160,175 L160,220 Z" fill="#050510" />
            </svg>
        </motion.div>
    );
};

// ========== FIREFLIES (night only) ==========
const Fireflies = ({ scrollProgress }) => {
    const fireflies = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: 5 + Math.random() * 90 + '%',
            top: 50 + Math.random() * 40 + '%',
            delay: Math.random() * 4,
            duration: 2 + Math.random() * 3
        }));
    }, []);

    const opacity = useTransform(scrollProgress, [0, 0.3, 0.5], [0.8, 0.4, 0]);

    return (
        <motion.div style={{ opacity, zIndex: 12 }}>
            {fireflies.map(f => (
                <motion.div
                    key={f.id}
                    className="firefly"
                    style={{ left: f.left, top: f.top }}
                    animate={{
                        x: [0, 25, -15, 20, 0],
                        y: [0, -20, 12, -25, 0]
                    }}
                    transition={{
                        duration: f.duration * 2,
                        repeat: Infinity,
                        delay: f.delay,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </motion.div>
    );
};

// ========== SHOOTING STAR (night only) ==========
const ShootingStar = ({ delay, startTop, startLeft, scrollProgress }) => {
    const opacity = useTransform(scrollProgress, [0, 0.35, 0.5], [1, 0.6, 0]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: startTop,
                left: startLeft,
                width: '120px',
                height: '2px',
                background: 'linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0))',
                borderRadius: '2px',
                // No rotation - travels horizontally
                opacity: 0
            }}
            animate={{
                x: [0, 400],
                opacity: [0, 1, 1, 0],
                scaleX: [0.5, 1.2, 0.8]
            }}
            transition={{
                duration: 1.5,
                delay: delay,
                repeat: Infinity,
                repeatDelay: 6 + delay,
                ease: 'easeOut'
            }}
        />
    );
};

// ========== MAIN SCENE ==========
const AnimatedScene = () => {
    const { scrollYProgress } = useScroll();

    // Sky: Night → Dawn → Day
    const skyBg = useTransform(
        scrollYProgress,
        [0, 0.25, 0.45, 0.65, 1],
        [
            'linear-gradient(180deg, #0B0B1A 0%, #1A1040 50%, #2D1B69 100%)',
            'linear-gradient(180deg, #1A1535 0%, #3D2060 50%, #5A3080 100%)',
            'linear-gradient(180deg, #4A3070 0%, #C0392B 30%, #E74C3C 50%, #F39C12 80%, #F1C40F 100%)',
            'linear-gradient(180deg, #5DADE2 0%, #85C1E9 40%, #AED6F1 100%)',
            'linear-gradient(180deg, #3498DB 0%, #5DADE2 30%, #87CEEB 70%, #B0E0E6 100%)'
        ]
    );

    return (
        <div className="scene-viewport">
            {/* Dynamic Sky */}
            <motion.div className="sky" style={{ background: skyBg }} />

            {/* Stars - night only */}
            <Stars scrollProgress={scrollYProgress} />

            {/* Shooting Stars - night only */}
            <ShootingStar delay={1} startTop="8%" startLeft="15%" scrollProgress={scrollYProgress} />
            <ShootingStar delay={4} startTop="15%" startLeft="45%" scrollProgress={scrollYProgress} />
            <ShootingStar delay={7} startTop="5%" startLeft="70%" scrollProgress={scrollYProgress} />

            {/* Moon - sets */}
            <Moon scrollProgress={scrollYProgress} />

            {/* Sun - rises with rays */}
            <Sun scrollProgress={scrollYProgress} />

            {/* Clouds - daytime */}
            <Cloud top="8%" left="5%" size={150} delay={0} scrollProgress={scrollYProgress} />
            <Cloud top="12%" left="55%" size={130} delay={8} scrollProgress={scrollYProgress} />
            <Cloud top="18%" left="30%" size={100} delay={15} scrollProgress={scrollYProgress} />
            <Cloud top="6%" left="75%" size={120} delay={5} scrollProgress={scrollYProgress} />

            {/* Bird Flock - daytime */}
            <BirdFlock scrollProgress={scrollYProgress} />

            {/* Fireflies - night only */}
            <Fireflies scrollProgress={scrollYProgress} />

            {/* Smaller Mountains */}
            <Mountain
                path="M0,300 L0,180 Q200,120 400,160 T800,100 T1200,150 L1440,120 L1440,300 Z"
                fill="#0D0D20"
                speed={-2}
                scrollProgress={scrollYProgress}
                zIndex={2}
            />
            <Mountain
                path="M0,300 L0,200 Q300,140 600,180 T1100,120 L1440,170 L1440,300 Z"
                fill="#1A1540"
                speed={-5}
                scrollProgress={scrollYProgress}
                zIndex={4}
            />
            <Mountain
                path="M0,300 L0,220 Q400,170 750,210 T1440,180 L1440,300 Z"
                fill="#2D2060"
                speed={-10}
                scrollProgress={scrollYProgress}
                zIndex={6}
            />
            <Mountain
                path="M0,300 L0,250 Q300,210 600,240 T1200,220 L1440,240 L1440,300 Z"
                fill="#402A80"
                speed={-18}
                scrollProgress={scrollYProgress}
                zIndex={8}
            />

            {/* Castle - grounded */}
            <Castle scrollProgress={scrollYProgress} />
        </div>
    );
};

export default AnimatedScene;
