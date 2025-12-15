
import type { PatientData, Disease, Diagnosis } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

export async function getDiagnosis(
  patientData: PatientData,
  disease: Disease,
  imageBase64: string,
  mimeType: string
): Promise<Diagnosis> {
  if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set. Please set VITE_GEMINI_API_KEY in your .env.local file.");
  }

  const systemInstruction = "You are a highly accurate medical diagnostic AI system. Analyze the provided medical image and patient details to predict the presence of a specific disease. Respond ONLY with valid JSON, no additional text.";

  const prompt = `Patient Details:
- Name: ${patientData.name || 'Not Provided'}
- Age: ${patientData.age || 'Not Provided'}
- Gender: ${patientData.gender}
- Other Medical Conditions: ${patientData.otherConditions || 'None'}

Disease to Detect: ${disease}

Provide your diagnosis in this exact JSON format:
{
  "diseaseName": "${disease}",
  "prediction": "Positive or Negative",
  "confidenceScore": 0-100,
  "briefReasoning": "explanation",
  "recommendation": "next steps"
}`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=' + API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: {
            text: systemInstruction
          }
        },
        contents: [
          {
            role: 'user',
            parts: [
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64,
                }
              },
              {
                text: prompt
              }
            ]
          }
        ],
        generation_config: {
          response_mime_type: 'application/json',
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response structure from API");
    }

    const jsonString = data.candidates[0].content.parts[0].text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation of the parsed object
    if (
      !result.diseaseName ||
      !result.prediction ||
      typeof result.confidenceScore !== 'number' ||
      !result.briefReasoning ||
      !result.recommendation
    ) {
      throw new Error("Received an invalid or incomplete diagnosis from the AI.");
    }

    return result as Diagnosis;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to get a diagnosis from the AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
