
import React from 'react';

export const FilmIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M16 17v4m-2-2h4M19 3v4m-2-2h4M10 3v4m-2-2h4m-3 10l-3 3m5 0l3-3m-3 3v-5m0 5h.01M12 12l-3 3m5 0l3-3m-3 3v-5m0 5h.01" />
  </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const PawPrintIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.78 15.28c-.14.14-.33.22-.53.22s-.39-.08-.53-.22l-1.47-1.47c-1.43-.28-2.5-1.57-2.5-3.03 0-1.74 1.41-3.15 3.15-3.15.37 0 .72.07 1.05.18.9.29 1.58 1.11 1.58 2.09 0 .28-.05.54-.15.78l1.47 1.47c.29.29.29.77 0 1.06zm-4.72-4.72c.4-.4.98-.63 1.58-.63.9 0 1.7.38 2.24.99.14.14.33.22.53.22s.39-.08.53-.22c.4-.4.63-.98.63-1.58 0-.9-.38-1.7-.99-2.24-.14-.14-.22-.33-.22-.53s.08-.39.22-.53c.4-.4.98-.63 1.58-.63.9 0 1.7.38 2.24.99.14.14.33.22.53.22s.39-.08.53-.22l.53-.53c.29-.29.29-.77 0-1.06s-.77-.29-1.06 0l-.53.53c-.54-.61-1.34-.99-2.24-.99-.6 0-1.18.23-1.58.63-.14.14-.33.22-.53.22s-.39-.08-.53-.22c-.54-.61-1.34-.99-2.24-.99-1.1 0-2.07.54-2.67 1.34-.23.3-.16.75.14 1.05l.53.53c.14.14.33.22.53.22s.39-.08.53-.22c.54-.61 1.34-.99 2.24-.99.6 0 1.18.23 1.58.63z" />
    </svg>
);

export const LocationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
