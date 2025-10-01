// store/breakingNewsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    articles: [],
    loading: false,
    error: null,
};

// Use env variable with fallback
const API_BASE_URL =
    (typeof process !== "undefined" ? process.env.REACT_APP_BACKEND_URL : null) ||
    "http://localhost:3000";

// Async thunk to fetch breaking news
export const fetchBreakingNews = createAsyncThunk(
    "breakingNews/fetchBreakingNews",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/news/latest`);
            const data = await res.json();
            if (data.success) {
                const topStories = data.articles.slice(0, 5).map((article) => ({
                    title: article.title,
                    url: article.url,
                }));
                return topStories;
            }
            return [];
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch breaking news");
        }
    }
);

const breakingNewsSlice = createSlice({
    name: "breakingNews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBreakingNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBreakingNews.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.loading = false;
            })
            .addCase(fetchBreakingNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default breakingNewsSlice.reducer;
