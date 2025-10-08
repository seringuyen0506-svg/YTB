
import React from 'react';
import { SparklesIcon } from './icons';

interface InputSectionProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isLoading: boolean;
  onGenerateIdea: () => void;
  onGenerateStoryboard: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  userInput,
  setUserInput,
  isLoading,
  onGenerateIdea,
  onGenerateStoryboard,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg">
        <label htmlFor="idea-input" className="block text-lg font-medium text-gray-200 mb-2">
          1. Enter Your Story Idea
        </label>
        <textarea
          id="idea-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
          rows={3}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:opacity-50"
          placeholder="e.g., 'a photographer discovers a hidden world through an old camera lens'"
        />
        <div className="text-center my-4 text-gray-500 font-semibold">OR</div>
        <button
          onClick={onGenerateIdea}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5" />
          Generate a New Idea
        </button>
        <div className="mt-6">
          <button
            onClick={onGenerateStoryboard}
            disabled={isLoading || !userInput}
            className="w-full text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg py-4 px-6 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Create Storyboard!
          </button>
        </div>
      </div>
    </div>
  );
};
