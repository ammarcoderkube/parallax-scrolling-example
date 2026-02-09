import React, { useMemo } from 'react';

const ShootingStars = () => {
    const shootingStars = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            top: Math.random() * 40 + '%',
            left: Math.random() * 50 + '%',
            delay: i * 4 + Math.random() * 2, // Stagger them
            duration: 2 + Math.random()
        }));
    }, []);

    return (
        <>
            {shootingStars.map(star => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        top: star.top,
                        left: star.left,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`
                    }}
                />
            ))}
        </>
    );
};

export default ShootingStars;
