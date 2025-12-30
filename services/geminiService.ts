import { GoogleGenAI } from "@google/genai";
import { COMPANY_NAME } from "../constants";

// Fix: Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) as per guidelines
export const getGeminiResponse = async (userMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `Você é um assistente virtual empático da ${COMPANY_NAME}. Seu objetivo é oferecer apoio inicial, explicar os primeiros passos após a perda de um ente querido e tirar dúvidas sobre os serviços funerários (traslado, velório, cremação, planos). Seja sempre acolhedor, respeitoso e direto. Se for uma emergência, instrua o usuário a ligar para o número (54) 99766-6269 imediatamente. Não use termos excessivamente técnicos sem explicar.`,
        temperature: 0.7,
      },
    });

    // Fix: Access the .text property directly instead of calling it as a function
    return response.text || "Desculpe, não consegui processar sua solicitação no momento. Por favor, ligue para nosso atendimento 24h.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estamos enfrentando instabilidades no assistente. Por favor, entre em contato diretamente pelo telefone (54) 99766-6269.";
  }
};