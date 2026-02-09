import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Mountains = () => {
    const { scrollYProgress } = useScroll();

    // Each layer moves at different speeds for depth
    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']); // Far - slowest
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']); // Mid
    const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']); // Near
    const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']); // Front - fastest

    return (
        <div className="mountains-container">
            {/* Far Mountains - Slowest */}
            <motion.div className="mountain-layer" style={{ y: y1, zIndex: 1 }}>
                <svg
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '45vh', position: 'absolute', bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="farMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1a2f4a" />
                            <stop offset="100%" stopColor="#0d1b2a" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,400 L0,280 Q180,200 360,260 T720,180 T1080,240 T1440,200 L1440,400 Z"
                        fill="url(#farMountain)"
                    />
                </svg>
            </motion.div>

            {/* Mid Mountains */}
            <motion.div className="mountain-layer" style={{ y: y2, zIndex: 2 }}>
                <svg
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '40vh', position: 'absolute', bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="midMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#243b55" />
                            <stop offset="100%" stopColor="#1b263b" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,400 L0,300 Q240,180 480,280 T960,160 T1440,260 L1440,400 Z"
                        fill="url(#midMountain)"
                    />
                </svg>
            </motion.div>

            {/* Near Mountains */}
            <motion.div className="mountain-layer" style={{ y: y3, zIndex: 3 }}>
                <svg
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '35vh', position: 'absolute', bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="nearMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2d4a6a" />
                            <stop offset="100%" stopColor="#1b3a5a" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,400 L0,320 Q300,200 600,300 T1200,180 L1440,280 L1440,400 Z"
                        fill="url(#nearMountain)"
                    />
                </svg>
            </motion.div>

            {/* Front Mountains - Fastest */}
            <motion.div className="mountain-layer" style={{ y: y4, zIndex: 4 }}>
                <svg
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '30vh', position: 'absolute', bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="frontMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3a5a7c" />
                            <stop offset="100%" stopColor="#2d3f5a" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,400 L0,340 Q200,260 400,320 T800,240 T1200,300 L1440,260 L1440,400 Z"
                        fill="url(#frontMountain)"
                    />
                </svg>
            </motion.div>

            {/* Snow caps on some peaks */}
            <motion.div className="mountain-layer" style={{ y: y2, zIndex: 2 }}>
                <svg
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '40vh', position: 'absolute', bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="snow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M960,160 Q970,165 980,180 L940,180 Q950,165 960,160 Z"
                        fill="url(#snow)"
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default Mountains;
