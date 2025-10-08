
import { GoogleGenAI, Type } from "@google/genai";
import { LoadingStep, MasterSetup, PublishingKit, StoryboardResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const masterSetupSchema = {
    type: Type.OBJECT,
    properties: {
        humanCharacter: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                age: { type: Type.INTEGER },
                profession: { type: Type.STRING },
                outfit: { type: Type.STRING, description: "A defining, consistent clothing item or accessory." },
            },
            required: ["name", "age", "profession", "outfit"],
        },
        animalCharacter: {
            type: Type.OBJECT,
            properties: {
                species: { type: Type.STRING },
                name: { type: Type.STRING },
                feature: { type: Type.STRING, description: "A defining, consistent feature like a colored collar." },
            },
            required: ["species", "name", "feature"],
        },
        setting: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING },
                timeOfDay: { type: Type.STRING },
                lighting: { type: Type.STRING },
                atmosphere: { type: Type.STRING },
            },
            required: ["location", "timeOfDay", "lighting", "atmosphere"],
        },
    },
    required: ["humanCharacter", "animalCharacter", "setting"],
};

const draftPromptsSchema = {
    type: Type.ARRAY,
    items: { type: Type.STRING }
};

const refinedPromptsSchema = {
    type: Type.ARRAY,
    items: { type: Type.STRING }
};

const publishingKitSchema = {
    type: Type.OBJECT,
    properties: {
        titles: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 to 5 viral, SEO-friendly titles in English for YouTube Shorts."
        },
        description: {
            type: Type.STRING,
            description: "One emotionally compelling video description with relevant keywords."
        },
        hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A comprehensive list of trending, niche, and emotional hashtags."
        }
    },
    required: ["titles", "description", "hashtags"]
};


export const generateIdea = async (): Promise<string> => {
    const prompt = `Generate a single, compelling, and dramatic story idea for a short viral video. The story must involve only adult humans and animals. It must not feature children. The idea should be a short sentence. Example: 'A dog saves its owner from a venomous snake.'`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { temperature: 1.0 }
    });
    return response.text.trim();
};

export const generateStoryboard = async (
    idea: string,
    setLoadingMessage: (message: LoadingStep) => void
): Promise<StoryboardResult> => {
    // 1. Create Master Setup
    setLoadingMessage(LoadingStep.CREATING_CHARACTERS);
    const masterSetupPrompt = `Based on this idea: "${idea}", create a 'Master Setup' for a cinematic short story. The setup must be consistent across all scenes. Respond with a JSON object.`;
    const masterSetupResponse = await ai.models.generateContent({
        model,
        contents: masterSetupPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: masterSetupSchema
        }
    });
    const masterSetup: MasterSetup = JSON.parse(masterSetupResponse.text);

    const masterSetupString = `MASTER SETUP (APPLY TO ALL PROMPTS):
    - Human: ${masterSetup.humanCharacter.name}, ${masterSetup.humanCharacter.age}, a ${masterSetup.humanCharacter.profession}, wearing ${masterSetup.humanCharacter.outfit}.
    - Animal: ${masterSetup.animalCharacter.name}, a ${masterSetup.animalCharacter.species}, with ${masterSetup.animalCharacter.feature}.
    - Setting: ${masterSetup.setting.location}, at ${masterSetup.setting.timeOfDay}. The lighting is ${masterSetup.setting.lighting} creating a ${masterSetup.setting.atmosphere} atmosphere.
    ---`;

    // 2. Generate Draft Prompts
    setLoadingMessage(LoadingStep.DRAFTING);
    const draftPromptGen = `Based on the idea "${idea}" and this master setup: ${JSON.stringify(masterSetup, null, 2)}, break the story into exactly 5 video prompts. Each prompt is for an 8-second video. These are DRAFT prompts focusing on narrative action. Do not add cinematic details yet. The first prompt must be a strong hook. The story must have a clear beginning, middle, and a resolution at the end. Respond with a JSON array of 5 strings.`;
    const draftResponse = await ai.models.generateContent({
        model,
        contents: draftPromptGen,
        config: {
            responseMimeType: "application/json",
            responseSchema: draftPromptsSchema
        }
    });
    const draftPrompts: string[] = JSON.parse(draftResponse.text);

    // 3. Critique Drafts
    setLoadingMessage(LoadingStep.CRITIQUING);
    const critiquePrompt = `You are a world-class, demanding film director. Critique the following 5 draft prompts for a short video series. Be harsh but constructive.
    
    Story Idea: "${idea}"
    Drafts: ${JSON.stringify(draftPrompts, null, 2)}
    
    Analyze them based on:
    1. Hook Quality: Is the first video immediately captivating?
    2. Pacing: Does the tension build effectively towards a climax?
    3. Cinematography Potential: Are the scenes visually boring? Suggest potential for dynamic shots.
    4. Emotional Impact: Is the story emotionally resonant?
    
    Provide specific, actionable feedback for improvement in a concise paragraph.`;
    const critiqueResponse = await ai.models.generateContent({
        model,
        contents: critiquePrompt,
    });
    const critique = critiqueResponse.text;

    // 4. Refine Prompts
    setLoadingMessage(LoadingStep.REFINING);
    const refinePrompt = `You are an expert AI Video Prompt Engineer. Rewrite the draft prompts based on the director's critique.
    
    Master Setup: ${masterSetupString}
    
    Drafts: ${JSON.stringify(draftPrompts, null, 2)}
    
    Director's Critique: ${critique}
    
    Instructions:
    - Create exactly 5 final prompts.
    - Each prompt MUST begin with the complete 'MASTER SETUP' text provided above.
    - Each prompt is for an 8-second video.
    - Integrate the director's feedback to improve hook, pacing, and emotion.
    - Add extremely detailed cinematic instructions: specify camera angles (e.g., low-angle shot, over-the-shoulder), camera movements (e.g., dolly zoom, tracking shot), frame rate (e.g., slow-motion 120fps), lighting (e.g., golden hour, rim lighting).
    - Include 2-4 dynamic shot changes within each 8-second prompt using creative transitions (e.g., Whip Pan, Rack Focus, Match Cut, Object Wipe).
    - Add sound design suggestions (e.g., 'tense non-copyright music builds', 'sound of rustling leaves').
    - Respond with a JSON array of 5 final, detailed prompt strings.`;
    const refinedResponse = await ai.models.generateContent({
        model,
        contents: refinePrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: refinedPromptsSchema
        }
    });
    const finalPrompts: string[] = JSON.parse(refinedResponse.text);

    // 5. Generate Publishing Kit
    setLoadingMessage(LoadingStep.PUBLISHING);
    const publishingPrompt = `You are a social media marketing expert. For the story about "${idea}", create a 'Publishing Kit'.
    Respond with a JSON object.`;
    const publishingResponse = await ai.models.generateContent({
        model,
        contents: publishingPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: publishingKitSchema
        }
    });
    const publishingKit: PublishingKit = JSON.parse(publishingResponse.text);

    setLoadingMessage(LoadingStep.DONE);
    return {
        prompts: finalPrompts,
        publishingKit,
        masterSetup,
    };
};
