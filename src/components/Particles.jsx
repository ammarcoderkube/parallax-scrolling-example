import React, { useMemo } from 'react';

const Particles = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            left: Math.random() * 100 + '%',
            delay: Math.random() * 20,
            duration: 15 + Math.random() * 15
        }));
    }, []);

    return (
        <div className="particles-container">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;
