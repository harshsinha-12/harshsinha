import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is a button or link
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Hide on touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return null;

  return (
    <>
      <motion.div
        className={`custom-cursor ${hovered ? 'hovered' : ''}`}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.5
        }}
      />
      {/* Tiny center dot */}
      <div 
        className="fixed w-1 h-1 bg-slate-800 rounded-full pointer-events-none z-[10000]"
        style={{ 
          left: position.x, 
          top: position.y, 
          transform: 'translate(-50%, -50%)' 
        }}
      />
    </>
  );
};

export default CustomCursor;
