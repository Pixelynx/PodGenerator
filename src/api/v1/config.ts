import { dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from '@google/generative-ai/server';

import dotenv from 'dotenv';

dotenv.config();

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const mediaPath = __dirname + "/media";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);

export default genAI;
