import React from 'react';

interface BannerProps {
  imageUrl: string;
  title: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title, text }) => {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full flex-col">
        <h1 className="text-5xl font-bold text-white text-center">{title}</h1>
        <h1 className="text-xl font-bold text-white text-center">{text}</h1>
      </div>
    </section>
  );
};

export default Banner; 