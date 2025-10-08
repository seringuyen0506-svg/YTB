
import React from 'react';
import { StoryboardResult } from '../types';
import { CopyButton } from './CopyButton';
import { UserIcon, PawPrintIcon, LocationIcon } from './icons';

interface OutputSectionProps {
  result: StoryboardResult;
}

const CharacterCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    items: { label: string; value: string | number }[];
}> = ({ icon, title, items }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex-1 min-w-[200px]">
        <div className="flex items-center gap-3 mb-2">
            <div className="text-indigo-400">{icon}</div>
            <h4 className="font-bold text-lg text-white">{title}</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-300">
            {items.map(item => (
                <li key={item.label}>
                    <span className="font-semibold text-gray-400">{item.label}:</span> {item.value}
                </li>
            ))}
        </ul>
    </div>
);


export const OutputSection: React.FC<OutputSectionProps> = ({ result }) => {
  const { prompts, publishingKit, masterSetup } = result;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Master Setup Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-400">Master Setup</h2>
        <div className="flex flex-wrap gap-4 justify-center">
            <CharacterCard 
                icon={<UserIcon />} 
                title={masterSetup.humanCharacter.name}
                items={[
                    { label: "Age", value: masterSetup.humanCharacter.age },
                    { label: "Profession", value: masterSetup.humanCharacter.profession },
                    { label: "Outfit", value: masterSetup.humanCharacter.outfit },
                ]}
            />
             <CharacterCard 
                icon={<PawPrintIcon />} 
                title={masterSetup.animalCharacter.name}
                items={[
                    { label: "Species", value: masterSetup.animalCharacter.species },
                    { label: "Feature", value: masterSetup.animalCharacter.feature },
                ]}
            />
             <CharacterCard 
                icon={<LocationIcon />} 
                title="Setting"
                items={[
                    { label: "Location", value: masterSetup.setting.location },
                    { label: "Time", value: masterSetup.setting.timeOfDay },
                    { label: "Atmosphere", value: masterSetup.setting.atmosphere },
                ]}
            />
        </div>
      </div>


      {/* Video Prompts Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Cinematic Video Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 relative group flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-indigo-400">Video {index + 1} / 5</h3>
                    <CopyButton textToCopy={prompt} />
                </div>
                <p className="text-gray-300 text-sm flex-grow">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Publishing Kit Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Publishing Kit</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
          {/* Titles */}
          <div className="relative">
            <h3 className="font-bold text-xl text-indigo-400 mb-2">Viral Titles</h3>
            <CopyButton textToCopy={publishingKit.titles.join('\n')} />
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {publishingKit.titles.map((title, i) => <li key={i}>{title}</li>)}
            </ul>
          </div>

          {/* Description */}
          <div className="relative">
            <h3 className="font-bold text-xl text-indigo-400 mb-2">Video Description</h3>
            <CopyButton textToCopy={publishingKit.description} />
            <p className="text-gray-300 whitespace-pre-wrap">{publishingKit.description}</p>
          </div>

          {/* Hashtags */}
          <div className="relative">
            <h3 className="font-bold text-xl text-indigo-400 mb-2">Hashtags</h3>
            <CopyButton textToCopy={publishingKit.hashtags.join(' ')} />
            <div className="flex flex-wrap gap-2">
              {publishingKit.hashtags.map((tag, i) => (
                <span key={i} className="bg-gray-700 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
