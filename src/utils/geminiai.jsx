import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from './constants';

const geminiai = new GoogleGenerativeAI(
    GEMINI_API_KEY
);

export default geminiai;