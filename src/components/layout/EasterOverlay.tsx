'use client';

import { useEffect, useState } from 'react';

const EGGS = [
  { id: 1, left: '5%',  delay: '0s',   duration: '12s', size: 28, color: '#e8a0bf', stripe: '#f7cfe0' },
  { id: 2, left: '15%', delay: '2s',   duration: '15s', size: 22, color: '#a8d8a8', stripe: '#c8f0c8' },
  { id: 3, left: '28%', delay: '5s',   duration: '13s', size: 32, color: '#aac4e8', stripe: '#ccddf5' },
  { id: 4, left: '45%', delay: '1s',   duration: '16s', size: 24, color: '#f5d778', stripe: '#faedb0' },
  { id: 5, left: '60%', delay: '3.5s', duration: '14s', size: 26, color: '#c9a0dc', stripe: '#e2ccf0' },
  { id: 6, left: '75%', delay: '7s',   duration: '12s', size: 20, color: '#f0a878', stripe: '#f8cba8' },
  { id: 7, left: '88%', delay: '4s',   duration: '17s', size: 30, color: '#80d4d4', stripe: '#b0e8e8' },
  { id: 8, left: '38%', delay: '9s',   duration: '14s', size: 18, color: '#f08080', stripe: '#f8b0b0' },
  ];

function EasterEgg({ left, delay, duration, size, color, stripe }: {
    left: string; delay: string; duration: string; size: number; color: string; stripe: string;
}) {
    return (
          <div
                  style={{
                            position: 'fixed',
                            left,
                            top: '-60px',
                            width: size,
                            height: size * 1.25,
                            animation: `easterFall ${duration} ${delay} infinite linear`,
                            pointerEvents: 'none',
                            zIndex: 9999,
                            opacity: 0.75,
                  }}
                >
                <svg viewBox="0 0 40 50" width={size} height={size * 1.25}>
                        <ellipse cx="20" cy="25" rx="18" ry="23" fill={color} />
                        <ellipse cx="20" cy="25" rx="18" ry="5" fill={stripe} opacity="0.7" />
                        <ellipse cx="20" cy="35" rx="18" ry="5" fill={stripe} opacity="0.7" />
                        <ellipse cx="20" cy="25" rx="18" ry="23" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                </svg>svg>
          </div>div>
        );
}

function EasterBunny() {
    return (
          <div
                  style={{
                            position: 'fixed',
                            bottom: '90px',
                            right: '18px',
                            zIndex: 9998,
                            pointerEvents: 'none',
                            animation: 'bunnyBob 3s ease-in-out infinite',
                  }}
                >
                <svg width="52" height="64" viewBox="0 0 52 64" fill="none">
                        <ellipse cx="18" cy="14" rx="6" ry="13" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                        <ellipse cx="18" cy="14" rx="3" ry="9" fill="#f9b8c8" />
                        <ellipse cx="34" cy="14" rx="6" ry="13" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                        <ellipse cx="34" cy="14" rx="3" ry="9" fill="#f9b8c8" />
                        <ellipse cx="26" cy="30" rx="16" ry="14" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                        <circle cx="20" cy="27" r="2.5" fill="#5b3a8a" />
                        <circle cx="32" cy="27" r="2.5" fill="#5b3a8a" />
                        <circle cx="21" cy="26" r="0.8" fill="white" />
                        <circle cx="33" cy="26" r="0.8" fill="white" />
                        <ellipse cx="26" cy="32" rx="2" ry="1.2" fill="#f9a0b0" />
                        <path d="M23 34 Q26 37 29 34" stroke="#c0a0a0" strokeWidth="1" fill="none" strokeLinecap="round" />
                        <ellipse cx="26" cy="52" rx="14" ry="11" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                        <ellipse cx="16" cy="31" rx="4" ry="2.5" fill="#f9c8d0" opacity="0.6" />
                        <ellipse cx="36" cy="31" rx="4" ry="2.5" fill="#f9c8d0" opacity="0.6" />
                        <ellipse cx="26" cy="50" rx="5" ry="6.5" fill="#a8d8a8" />
                        <ellipse cx="26" cy="50" rx="5" ry="1.8" fill="#c8f0c8" opacity="0.8" />
                </svg>svg>
          </div>div>
        );
}

export default function EasterOverlay() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;
  
    return (
          <>
                <style>{`
                        @keyframes easterFall {
                                  0%   { transform: translateY(-60px) rotate(0deg);   opacity: 0; }
                                            5%   { opacity: 0.75; }
                                                      95%  { opacity: 0.75; }
                                                                100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
                                                                        }
                                                                                @keyframes bunnyBob {
                                                                                          0%, 100% { transform: translateY(0px); }
                                                                                                    50%       { transform: translateY(-6px); }
                                                                                                            }
                                                                                                                  `}</style>style>
            {EGGS.map(egg => <EasterEgg key={egg.id} {...egg} />)}
                <EasterBunny />
          </>>
        );
}
}</></div>
