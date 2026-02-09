import React from 'react';
import { motion } from 'framer-motion';

const ProductShowcase = () => {
    return (
        <div className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="glass-card" style={{ maxWidth: '1000px', width: '90%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Futuristic Gear</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Designed for the digital nomad. Built for the deep space explorer.
                            Our new collection blends performance with unparalleled aesthetics.
                        </p>
                        <button className="btn btn-primary">Learn More</button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        style={{ position: 'relative' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
                            alt="Cyber Shoe"
                            style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,242,255,0.2)' }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            background: 'var(--accent-secondary)',
                            borderRadius: '50%',
                            zIndex: -1,
                            filter: 'blur(40px)',
                            opacity: 0.6
                        }}></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
