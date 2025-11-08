
import { GoogleGenAI, Modality } from "@google/genai";
import type { Part } from '@google/genai';
import { getBaseCaliforniaMockupConfig, buildPromptFromConfig } from '../lib/prompt';
import type { RoomType, SubjectType } from '../types/mockup';

// Helper to convert a File object to a GoogleGenAI.Part
async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // The result includes the Base64 prefix, remove it.
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Failed to read file as data URL."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

/**
 * Generates mockup images using the Gemini API.
 * 
 * @param prompt The detailed text prompt for the image generation model.
 * @param wallpaperFile An optional File object for the wallpaper pattern.
 * @returns A promise that resolves to an array of image data URLs.
 */
async function generateMockupImages(prompt: string, wallpaperFile: File | null): Promise<string[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: Part[] = [{ text: prompt }];
  if (wallpaperFile) {
      const imagePart = await fileToGenerativePart(wallpaperFile);
      // Add wallpaper image before the text prompt for the model to process it as context.
      parts.unshift(imagePart);
  }

  // Generate two images in parallel to improve user experience
  const generationPromises = Array(2).fill(0).map(() => 
    ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    })
  );

  const responses = await Promise.all(generationPromises);

  const imageUrls = responses.map(response => {
    const part = response?.candidates?.[0]?.content?.parts?.[0];
    if (part?.inlineData?.data) {
        const base64ImageBytes: string = part.inlineData.data;
        // The Gemini API for image generation might not return a mimeType, default to jpeg.
        const mimeType = part.inlineData.mimeType || 'image/jpeg';
        return `data:${mimeType};base64,${base64ImageBytes}`;
    }
    console.error("Image generation failed. Invalid response from API:", response);
    throw new Error("Image generation failed. One or more responses did not contain image data.");
  });

  return imageUrls;
}

/**
 * Orchestrates the mockup generation process.
 * 
 * @param wallpaperDescription A description of the wallpaper.
 * @param roomType The type of room for the mockup.
 * @param subjectType The type of subject to include in the mockup.
 * @param wallpaperFile An optional File object for the wallpaper pattern.
 * @returns A promise that resolves to an array of generated image data URLs.
 */
export async function generateMockup(
  wallpaperDescription: string,
  roomType: RoomType,
  subjectType: SubjectType,
  wallpaperFile: File | null
): Promise<string[]> {
  try {
    if (!wallpaperDescription) {
      throw new Error("Wallpaper description is required.");
    }

    const config = getBaseCaliforniaMockupConfig(roomType, subjectType);
    const prompt = buildPromptFromConfig(config, wallpaperDescription, !!wallpaperFile);
    const imageUrls = await generateMockupImages(prompt, wallpaperFile);
    
    return imageUrls;
  } catch (error) {
    console.error("Error generating mockup:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key')) {
             throw new Error("API key is invalid or not set. Please check your setup.");
        }
        throw error;
    }
    throw new Error("An unknown error occurred during mockup generation.");
  }
}
