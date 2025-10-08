
import React from 'react';
import { LoadingStep } from '../types';

interface LoadingIndicatorProps {
  loadingMessage: LoadingStep;
}

const LoadingSpinner: React.FC = () => (
    <div className="w-5 h-5 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin"></div>
);

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loadingMessage }) => {
  const steps = Object.values(LoadingStep).filter(v => v !== LoadingStep.IDLE && v !== LoadingStep.DONE);
  const currentStepIndex = steps.indexOf(loadingMessage);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold text-center text-indigo-400 mb-4">AI Director at Work...</h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <LoadingSpinner/>
          <p className="text-lg font-medium text-gray-200">{loadingMessage}</p>
        </div>
        <div className="space-y-2">
            {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                    <div key={step} className={`flex items-center gap-3 transition-all duration-300 ${isCurrent ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isCurrent ? 'bg-indigo-500 animate-pulse' : isCompleted ? 'bg-green-500' : 'bg-gray-600'}`}>
                            {isCompleted && <span className="text-white text-xs">✔</span>}
                        </div>
                        <span className={`${isCurrent ? 'font-semibold' : ''}`}>{step.replace('...','')}</span>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
};
