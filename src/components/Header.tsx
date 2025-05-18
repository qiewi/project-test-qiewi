import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all bg-[#FF6600]/95 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="font-bold text-xl text-white">Suitmedia</div>
        <ul className="flex gap-8">
          <li className="font-medium text-white hover:underline underline-offset-8">Work</li>
          <li className="font-medium text-white hover:underline underline-offset-8">About</li>
          <li className="font-medium text-white hover:underline underline-offset-8">Services</li>
          <li className="font-medium text-white underline underline-offset-8">Ideas</li>
          <li className="font-medium text-white hover:underline underline-offset-8">Careers</li>
          <li className="font-medium text-white hover:underline underline-offset-8">Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 