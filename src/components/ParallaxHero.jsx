import React from 'react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

const ParallaxHero = () => {
  return (
    <div className="hero-section">
      <ParallaxBanner style={{ aspectRatio: '2 / 1', height: '100vh' }}>
        <ParallaxBannerLayer
          image="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072"
          speed={-20}
        />
        <ParallaxBannerLayer speed={-10}>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="hero-title gradient-text">EXPLORE THE<br />BEYOND</h1>
          </div>
        </ParallaxBannerLayer>
        <ParallaxBannerLayer
          image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
          speed={10}
          opacity={[0.5, 1]}
          scale={[1, 1.2]}
        />
        <ParallaxBannerLayer speed={20}>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <button className="btn btn-primary">Start Journey</button>
          </div>
        </ParallaxBannerLayer>
      </ParallaxBanner>

      <style jsx>{`
        .hero-section {
          width: 100%;
          height: 100vh;
        }
        .absolute {
          position: absolute;
        }
        .inset-0 {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .items-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .flex {
          display: flex;
        }
        .bottom-10 {
           bottom: 2.5rem;
        }
        .left-0 { left: 0; }
        .right-0 { right: 0; }
      `}</style>
    </div>
  );
};

export default ParallaxHero;
