"use client"

import React, { useEffect, useRef, useState } from 'react';
import Suitmedia from "@/../public/suitmedia.png"
import Image from 'next/image'
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Ideas', path: '/ideas' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsAtTop(currentScroll <= 0);
      if (currentScroll <= 0) {
        setShow(true);
        lastScroll.current = 0;
        return;
      }
      if (currentScroll > lastScroll.current) {
        setShow(false); // scroll down
      } else {
        setShow(true); // scroll up
      }
      lastScroll.current = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${show ? 'translate-y-0' : '-translate-y-full'} ${isAtTop ? 'bg-[#FF6600]' : 'bg-[#FF6600]/80'} backdrop-blur-md shadow-sm`}
      style={{ willChange: 'transform' }}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Image 
          src={Suitmedia}
          width={80}
          alt="Suitmedia Logo"
        />
        <ul className="flex gap-8">
          {menuItems.map(item => (
            <li
              key={item.path}
              className={`font-medium text-white hover:underline underline-offset-8 transition-all duration-200 ${pathname === item.path ? 'underline text-white underline-offset-8 decoration-4' : ''}`}
            >
              <a href={item.path}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 