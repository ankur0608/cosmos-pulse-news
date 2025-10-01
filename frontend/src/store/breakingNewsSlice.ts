import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    articles: [],
    loading: false,
    error: null,
};

// Use env variable with fallback
const API_BASE_URL = "https://cosmos-pulse-news.onrender.com"


export const fetchBreakingNews = createAsyncThunk(
    "breakingNews/fetchBreakingNews",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/news/latest`);
            const data = await res.json();
            if (data.success) {
                return data.articles.slice(0, 5).map((article) => ({
                    title: article.title,
                    url: article.url,
                }));
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
