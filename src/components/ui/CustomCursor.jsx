import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentOuterPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile/touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Track hovered elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Smooth animation loop
    let animationFrameId;
    const updateCursor = () => {
      // Lerp (Linear Interpolation) for smooth follow effect
      const easeDot = 0.25;
      const easeOuter = 0.12;

      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * easeDot;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * easeDot;

      currentOuterPos.current.x += (mousePos.current.x - currentOuterPos.current.x) * easeOuter;
      currentOuterPos.current.y += (mousePos.current.y - currentOuterPos.current.y) * easeOuter;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${currentOuterPos.current.x}px, ${currentOuterPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`custom-cursor-dot ${isClicked ? 'clicked' : ''} ${isHovered ? 'hovered' : ''}`}
      />
      <div 
        ref={cursorOuterRef} 
        className={`custom-cursor-outer ${isClicked ? 'clicked' : ''} ${isHovered ? 'hovered' : ''}`}
      />
    </>
  );
}
