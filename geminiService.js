import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client safely
const apiKey = process.env.API_KEY;
let ai = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiHint = async (questionText, topic) => {
  if (!ai) {
    return "APIキーが設定されていないため、AIヒントを利用できません。";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      あなたは高校の「情報I」の先生です。
      生徒が以下のデータ分析の問題で悩んでいます。
      答えを直接教えず、考えるためのヒントを1つだけ、簡潔に（100文字以内で）教えてください。
      
      トピック: ${topic}
      問題: ${questionText}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "ヒントの生成に失敗しました。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "エラーが発生しました。もう一度試してください。";
  }
};

export const getGeminiDeepDive = async (questionText, correctAnswer) => {
   if (!ai) {
    return "APIキーが設定されていないため、解説を利用できません。";
  }

  try {
     const model = 'gemini-3-flash-preview';
    const prompt = `
      あなたは高校の「情報I」の先生です。
      以下の問題について、なぜその答えになるのか、データ分析の初心者にもわかるように解説してください。
      実生活の例などを交えるとより良いです。200文字程度でお願いします。

      問題: ${questionText}
      正解: ${correctAnswer}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "解説の生成に失敗しました。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "エラーが発生しました。";
  }
}