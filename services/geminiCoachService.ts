// Corrected: Use GoogleGenAI instead of the deprecated GoogleGenerativeAI
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// Corrected: Use GoogleGenAI instead of the deprecated GoogleGenerativeAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        strikeAccuracy: {
            type: Type.NUMBER,
            description: 'The estimated strike accuracy of the primary fighter as a percentage (e.g., 87 for 87%).'
        },
        successfulTakedowns: {
            type: Type.INTEGER,
            description: 'The total number of successful takedowns by the primary fighter.'
        },
        avgStrikesPerMin: {
            type: Type.NUMBER,
            description: 'The average number of significant strikes landed per minute by the primary fighter.'
        },
        keyInsights: {
            type: Type.ARRAY,
            description: 'A list of 3-5 brief, actionable key insights about the fighter\'s performance.',
            items: { type: Type.STRING }
        },
        trainingFocus: {
            type: Type.OBJECT,
            description: 'A recommended training focus based on the analysis.',
            properties: {
                title: { type: Type.STRING, description: 'A concise title for the training focus area.' },
                points: {
                    type: Type.ARRAY,
                    description: 'A list of 2-3 specific drills or areas to work on.',
                    items: { type: Type.STRING }
                }
            },
            required: ["title", "points"]
        },
        trainingSchedule: {
            type: Type.OBJECT,
            description: 'A recommended 7-day training schedule based on the analysis findings. Each day should have a specific focus.',
            properties: {
                monday: { type: Type.STRING, description: "Training focus for Monday." },
                tuesday: { type: Type.STRING, description: "Training focus for Tuesday." },
                wednesday: { type: Type.STRING, description: "Training focus for Wednesday." },
                thursday: { type: Type.STRING, description: "Training focus for Thursday." },
                friday: { type: Type.STRING, description: "Training focus for Friday." },
                saturday: { type: Type.STRING, description: "Training focus for Saturday." },
                sunday: { type: Type.STRING, description: "Training focus or rest day for Sunday." }
            },
            required: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        }
    },
    required: ["strikeAccuracy", "successfulTakedowns", "avgStrikesPerMin", "keyInsights", "trainingFocus", "trainingSchedule"]
};

// Function to upload the file to the Gemini API
export const uploadVideoFile = async (file: File, onProgress: (progress: number) => void): Promise<{ uri: string; mimeType: string; }> => {
    try {
        const uploadResult = await ai.files.upload({
            file,
        });
        
        if (!uploadResult || !uploadResult.name) {
            console.error("Invalid response from file upload API:", uploadResult);
            throw new Error("File upload failed: The API did not return a valid file object.");
        }

        onProgress(50);

        let uploadedFile = await ai.files.get({ name: uploadResult.name });
        while (uploadedFile.state === 'PROCESSING') {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Polling interval
            uploadedFile = await ai.files.get({ name: uploadResult.name });
        }

        if (uploadedFile.state === 'FAILED') {
            throw new Error('Video processing failed after upload.');
        }
        
        if (!uploadedFile.uri || !uploadedFile.mimeType) {
            throw new Error('Video processing succeeded, but necessary file data (URI or MIME type) was not returned.');
        }

        onProgress(100);

        return { uri: uploadedFile.uri, mimeType: uploadedFile.mimeType };
    } catch (e: any) {
        console.error("Error during file upload:", e);
        if (e?.message?.includes('x-google-upload-url')) {
             throw new Error('Failed to get upload URL. Server did not return the required headers. This might be a temporary network or API issue.');
        }
        throw new Error(e?.message || 'Failed to upload video. Please try again.');
    }
};

// Function to analyze the video using the uploaded file's URI
export const analyzeFightVideo = async (videoUri: string, mimeType: string, fighterName: string, opponentName: string, weightClass: string): Promise<AnalysisResult> => {
    const systemInstruction = `You are an expert MMA (Mixed Martial Arts) coach and analyst. Your task is to analyze the provided fight video clip and generate a concise, data-driven report. Focus on the fighter who is more prominent or appears to be the subject of the analysis. Provide objective feedback and actionable advice. Based on the key insights and recommended training focus, generate a comprehensive 7-day training schedule. Respond ONLY with a valid JSON object that adheres to the provided schema.`;

    const textPart = {
        text: `Analyze this MMA fight footage focusing on fighter ${fighterName} who is facing opponent ${opponentName} in the ${weightClass} division. Provide a comparative analysis of ${fighterName}'s performance against their opponent in this clip. Based on this, generate a detailed breakdown of ${fighterName}'s performance and a recommended weekly training schedule tailored to exploit the opponent's weaknesses and bolster their own strengths.`
    };

    const videoPart = {
        fileData: {
            mimeType: mimeType,
            fileUri: videoUri, // Corrected: The API expects 'fileUri', not 'uri'.
        }
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [videoPart, textPart],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as AnalysisResult;
    } catch (error) {
        console.error("Error analyzing video with Gemini:", error);
        throw new Error("Failed to get analysis from AI. The model may have been unable to process the video.");
    }
};