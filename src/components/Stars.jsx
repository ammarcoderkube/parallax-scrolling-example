import React, { useMemo } from 'react';

const Stars = () => {
    const stars = useMemo(() => {
        const starTypes = ['small', 'medium', 'large'];
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            type: starTypes[Math.floor(Math.random() * 3)],
            top: Math.random() * 70 + '%', // Keep stars in upper 70%
            left: Math.random() * 100 + '%',
            delay: Math.random() * 5
        }));
    }, []);

    return (
        <div className="stars-container">
            {stars.map(star => (
                <div
                    key={star.id}
                    className={`star star--${star.type}`}
                    style={{
                        top: star.top,
                        left: star.left,
                        animationDelay: `${star.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

export default Stars;
