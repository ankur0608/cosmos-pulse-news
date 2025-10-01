import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "./apiConfig";

// The NewsItem type remains the same. The backend normalizes all sources into this structure.
export type NewsItem = {
    title: string;
    description: string;
    url: string;
    author?: string;
    source: string; // Backend ensures this is a string (e.g., "Forbes")
    publishedAt: string;
    imageUrl?: string;
};

// The state structure is unchanged.
type NewsState = {
    articles: NewsItem[];
    loading: boolean;
    error: string | null;
};

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
};

// --- ASYNC THUNKS ---

/**
 * 1. This thunk for the homepage remains unchanged.
 */
export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/news/top-headlines?limit=25`
            );
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            const data = await response.json();
            return data.success
                ? data.articles
                : rejectWithValue(data.message || "Failed to fetch news articles.");
        } catch (err: any) {
            return rejectWithValue(err.message || "An unknown error occurred");
        }
    }
);

/**
 * 2. NEW thunk for fetching news by a specific category.
 */
export const fetchNewsByCategory = createAsyncThunk(
    "news/fetchByCategory",
    async (category: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/news/category/${category}`);
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            const data = await response.json();

            // ✅ Backend returns a plain array for categories
            if (Array.isArray(data)) {
                return data;
            }

            return rejectWithValue("Invalid response format from server");
        } catch (err: any) {
            return rejectWithValue(err.message || "An unknown error occurred");
        }
    }
);

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- Cases for fetchNews (Homepage) ---
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.loading = false;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // --- NEW cases for fetchNewsByCategory ---
            .addCase(fetchNewsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
                // This action also updates the same 'articles' array.
                state.articles = action.payload;
                state.loading = false;
            })
            .addCase(fetchNewsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default newsSlice.reducer;