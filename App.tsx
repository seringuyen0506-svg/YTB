
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { LoadingIndicator } from './components/LoadingIndicator';
import { OutputSection } from './components/OutputSection';
import { generateIdea, generateStoryboard } from './services/geminiService';
import { StoryboardResult, LoadingStep } from './types';

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<LoadingStep>(LoadingStep.IDLE);
  const [storyboardResult, setStoryboardResult] = useState<StoryboardResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdea = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStoryboardResult(null);
    setLoadingMessage(LoadingStep.GETTING_IDEA);
    try {
      const idea = await generateIdea();
      setUserInput(idea);
    } catch (e) {
      setError("Failed to generate an idea. Please check your API key and try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
      setLoadingMessage(LoadingStep.IDLE);
    }
  }, []);

  const handleGenerateStoryboard = useCallback(async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setStoryboardResult(null);
    try {
      const result = await generateStoryboard(userInput, setLoadingMessage);
      setStoryboardResult(result);
    } catch (e) {
      setError("An error occurred while generating the storyboard. Please try again.");
      console.error(e);
      setLoadingMessage(LoadingStep.IDLE);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <InputSection
          userInput={userInput}
          setUserInput={setUserInput}
          isLoading={isLoading}
          onGenerateIdea={handleGenerateIdea}
          onGenerateStoryboard={handleGenerateStoryboard}
        />
        {error && (
          <div className="max-w-3xl mx-auto p-4 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
            {error}
          </div>
        )}
        {isLoading && <LoadingIndicator loadingMessage={loadingMessage} />}
        {storyboardResult && !isLoading && <OutputSection result={storyboardResult} />}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Designed for content creators.</p>
      </footer>
    </div>
  );
}

export default App;
