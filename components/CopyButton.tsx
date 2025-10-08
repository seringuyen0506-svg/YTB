
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [textToCopy]);

  return (
    <button
      onClick={handleCopy}
      className={`absolute top-2 right-2 p-2 rounded-lg transition-all duration-200 ${
        copied
          ? 'bg-green-600 text-white'
          : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600'
      }`}
      aria-label="Copy prompt"
    >
      {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
    </button>
  );
};
