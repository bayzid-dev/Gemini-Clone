import { GoogleGenAI } from "@google/genai";

const { VITE_GEMINI_API_KEY } = import.meta.env;

// Ensure the API key is available
if (!VITE_GEMINI_API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set it in your environment variables.");
}

// Instantiate the Gemini API key.
const ai = new GoogleGenAI({
  apiKey: VITE_GEMINI_API_KEY
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

export default main;


