import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Animated title that reveals letter by letter
export const AnimatedTitle = ({ text, className }) => {
    const words = text.split(' ');

    return (
        <motion.h1
            className={className}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            variants={letterAnimation}
                            style={{ display: 'inline-block' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.h1>
    );
};

// Glass card with scroll-triggered animation
export const AnimatedCard = ({ children, delay = 0 }) => {
    return (
        <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.9,
                delay,
                ease: [0.6, -0.05, 0.01, 0.99]
            }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {children}
        </motion.div>
    );
};

// Text reveal animation
export const RevealText = ({ children, delay = 0 }) => {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

// Parallax text that moves with scroll
export const ParallaxText = ({ children, speed = 50 }) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: speed }}
            transition={{ duration: 0 }}
            style={{ willChange: 'transform' }}
        >
            {children}
        </motion.div>
    );
};

// Scroll-triggered counter
export const AnimatedCounter = ({ value, suffix = '' }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                initial={{ count: 0 }}
                whileInView={{ count: value }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                {({ count }) => Math.round(count)}
            </motion.span>
            {suffix}
        </motion.span>
    );
};

// Hover-responsive element
export const HoverScale = ({ children, scale = 1.05 }) => {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    );
};
