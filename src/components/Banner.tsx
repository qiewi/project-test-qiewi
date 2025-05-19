"use client";
import React, { useEffect, useState } from 'react';

interface BannerProps {
  imageUrl: string;
  title: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title, text }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // You can tweak the divisor for more/less parallax
      setOffset(window.scrollY * 0.4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${offset}px`,
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
          transition: 'background-position 0.1s linear',
        }}
      />
      <div
        className="relative z-10 flex items-center justify-center h-full flex-col"
        style={{
          transform: `translateY(${offset * 0.3}px)`, // text moves slower for more parallax
          transition: 'transform 0.1s linear',
        }}
      >
        <h1 className="text-5xl font-bold text-white text-center">{title}</h1>
        <h1 className="text-xl font-bold text-white text-center">{text}</h1>
      </div>
    </section>
  );
};

export default Banner; 