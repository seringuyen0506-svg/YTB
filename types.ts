
export interface MasterSetup {
  humanCharacter: {
    name: string;
    age: number;
    profession: string;
    outfit: string;
  };
  animalCharacter: {
    species: string;
    name: string;
    feature: string;
  };
  setting: {
    location: string;
    timeOfDay: string;
    lighting: string;
    atmosphere: string;
  };
}

export interface PublishingKit {
  titles: string[];
  description: string;
  hashtags: string[];
}

export interface StoryboardResult {
  prompts: string[];
  publishingKit: PublishingKit;
  masterSetup: MasterSetup;
}

export enum LoadingStep {
  IDLE = "Ready to create",
  GETTING_IDEA = "Generating a new idea...",
  CREATING_CHARACTERS = "Building characters...",
  DRAFTING = "Writing draft storyboard...",
  CRITIQUING = "AI Director is reviewing...",
  REFINING = "Refining cinematic shots...",
  PUBLISHING = "Generating publishing kit...",
  DONE = "Done!",
}
