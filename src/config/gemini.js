import { GoogleGenAI } from "@google/genai";

// 1. Instantiate the Gemini API key.
const ai = new GoogleGenAI({
  apiKey: "AIzaSyApZYPqyEFxocaiuyiST5TNBB6pNFp8O6s",
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  console.log(response.text);
}

export default main;


