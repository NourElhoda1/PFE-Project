import React from 'react'
import { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

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
    <div className='relative w-16 h-8 flex items-center dark:bg-teal-500 bg-gray-400 cursor-pointer rounded-full p-1 '
    onClick={() => setDarkMode(!darkMode)}>
       
        <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaMoon /> : <BsSunFill />}
        </button>
    </div>
  )
}

export default DarkModeTheme