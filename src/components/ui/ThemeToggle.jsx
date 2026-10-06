import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '', id = 'theme-toggle-switch' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`theme-toggle-switch ${isDark ? 'is-dark' : 'is-light'} ${className}`}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
    >
      {/* Track Background Elements */}
      <span className="theme-toggle-track">
        {/* Night Stars (visible in dark mode) */}
        <span className="track-icon track-icon-dark" aria-hidden="true">
          <Moon size={14} className="track-moon-icon" />
          <span className="star star-1">✦</span>
          <span className="star star-2">·</span>
        </span>

        {/* Day Sun / Rays (visible in light mode) */}
        <span className="track-icon track-icon-light" aria-hidden="true">
          <Sun size={14} className="track-sun-icon" />
          <span className="ray-sparkle">✧</span>
        </span>
      </span>

      {/* Animated Sliding Thumb */}
      <span className="theme-toggle-thumb">
        <span className="thumb-icon-container">
          {/* Moon Icon in thumb */}
          <span className={`thumb-icon-wrapper moon-wrapper ${isDark ? 'active' : ''}`}>
            <Moon size={15} strokeWidth={2.2} />
          </span>

          {/* Sun Icon in thumb */}
          <span className={`thumb-icon-wrapper sun-wrapper ${!isDark ? 'active' : ''}`}>
            <Sun size={15} strokeWidth={2.2} />
          </span>
        </span>
      </span>
    </button>
  );
}
