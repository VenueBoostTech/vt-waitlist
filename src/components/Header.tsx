// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  const { theme } = useTheme();
  
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  return (
    <header className={`fixed left-0 top-0 z-999 w-full transition-all duration-300 ease-in-out ${
      stickyMenu ? "bg-white dark:bg-gray-900 py-2 shadow-md xl:py-0" : "bg-white dark:bg-gray-900 py-2 shadow-md xl:py-0"
    }`}>
      <div className="relative mx-auto max-w-[1170px] items-center justify-between px-4 sm:px-8 xl:flex xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-4/12">
          <Link href="/">
            <Image
              src={theme === 'dark' ? "/images/logo/logo-light.svg" : "/images/logo/logo.svg"}
              alt="VisionTrack"
              width={150}
              height={40}
              className="w-full"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-[#6B7280] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;