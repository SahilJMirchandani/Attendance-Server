
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseTimetable = async (fileBase64: string, mimeType: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            data: fileBase64,
            mimeType: mimeType,
          },
        },
        {
          text: "Parse this timetable image/document. Return a JSON array of lectures. Each object should have: day, name, startTime, endTime, and professor. Use 24-hour format for times (e.g., 08:30).",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING },
            name: { type: Type.STRING },
            startTime: { type: Type.STRING },
            endTime: { type: Type.STRING },
            professor: { type: Type.STRING },
          },
          required: ["day", "name", "startTime", "endTime"],
        },
      },
    },
  });

  return JSON.parse(response.text);
};

export const verifyFace = async (registeredFace: string, currentFrame: string) => {
  // In a real app, you'd use a dedicated face recognition library.
  // Here we use Gemini to "verify" if it's the same person as a powerful multimodal check.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: registeredFace, mimeType: "image/jpeg" } },
        { inlineData: { data: currentFrame, mimeType: "image/jpeg" } },
        { text: "Do these two images show the same person? Return a JSON object with a 'match' boolean and 'confidence' number (0-1)." }
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          match: { type: Type.BOOLEAN },
          confidence: { type: Type.NUMBER }
        }
      }
    }
  });

  return JSON.parse(response.text);
};
