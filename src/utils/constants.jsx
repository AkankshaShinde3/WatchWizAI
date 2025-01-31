export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY,
  }
};

export const userIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgYYED46R5puH88P1qic_RXu3sSoyfjyO3Pw&s.png";
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [{ identifier: "en", name: "English" }, { identifier: "hindi", name: "Hindi" }, { identifier: "marathi", name: "Marathi" },
{ identifier: "spanish", name: "Spanish" }, { identifier: "french", name: "French" }
];

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;