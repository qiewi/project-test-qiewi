import React from 'react';

interface BannerProps {
  imageUrl: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, text }) => {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg text-center">{text}</h1>
      </div>
    </section>
  );
};

export default Banner; 