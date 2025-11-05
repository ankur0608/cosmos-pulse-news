// src/store/apiConfig.ts

// 1. Read the variable from import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_BASE_URL) {
  console.error(
    "FATAL ERROR: VITE_BACKEND_URL is not defined in your .env file."
  );
}

export default API_BASE_URL;