
import React from 'react';
import { FilmIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 border-b border-gray-700">
      <div className="inline-flex items-center gap-3">
        <FilmIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Cinematic Storyboard <span className="text-indigo-400">AI</span>
        </h1>
      </div>
      <p className="mt-2 text-md text-gray-400 max-w-2xl mx-auto">
        Your personal AI Director for creating viral, short-form video content.
      </p>
    </header>
  );
};
