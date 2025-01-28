import genAI from './config';

async function testGeminiConfiguration() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  try {
    const result = await model.generateContent("Hello, Gemini!");
    console.log("Gemini response:", result.response.text());
    console.log("Config test successful!");
  } catch (error) {
    console.error("Config test failed:", error);
  }
}

testGeminiConfiguration();
