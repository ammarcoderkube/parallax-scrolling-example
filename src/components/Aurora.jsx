import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Aurora = () => {
    const { scrollYProgress } = useScroll();

    // Aurora intensity increases and shifts as you scroll
    const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.6, 0.5, 0.3]);
    const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.6, 0.4]);
    const opacity3 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.25, 0.4, 0.5, 0.35]);

    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    return (
        <div className="aurora-container">
            <motion.div
                className="aurora-wave aurora-wave--1"
                style={{ opacity: opacity1, y: y1 }}
            />
            <motion.div
                className="aurora-wave aurora-wave--2"
                style={{ opacity: opacity2, y: y2 }}
            />
            <motion.div
                className="aurora-wave aurora-wave--3"
                style={{ opacity: opacity3, y: y3 }}
            />
        </div>
    );
};

export default Aurora;
