import React from 'react'
import { useState, useEffect } from 'react';
import {
    HiSun,
    HiMoon,
  } from "react-icons/hi";

function DarkModeTheme() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    },[]);

    useEffect(() => {
        if (darkMode) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    },[darkMode]);

  return (
    <div className="flex items-center">
    
    <div
      className="cursor-pointer"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
    </div>
  </div>
  )
}

export default DarkModeTheme