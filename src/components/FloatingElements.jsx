import React from 'react';
import { useParallax } from 'react-scroll-parallax';
import { Star, Zap, Shield, Rocket } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, speed, top, left, color }) => {
    const parallax = useParallax({
        speed: speed,
        rotate: [0, 360],
    });

    return (
        <div
            ref={parallax.ref}
            style={{
                position: 'absolute',
                top: top,
                left: left,
                color: color,
                opacity: 0.3,
                zIndex: 1
            }}
        >
            <Icon size={48} />
        </div>
    );
};

const FloatingElements = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
            <FloatingIcon icon={Star} speed={-15} top="20%" left="10%" color="#00f2ff" />
            <FloatingIcon icon={Zap} speed={25} top="60%" left="80%" color="#7000ff" />
            <FloatingIcon icon={Shield} speed={10} top="40%" left="85%" color="#00f2ff" />
            <FloatingIcon icon={Rocket} speed={-20} top="80%" left="15%" color="#7000ff" />
        </div>
    );
};

export default FloatingElements;
