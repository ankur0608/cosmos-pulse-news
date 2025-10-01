import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type NewsItem = {
    title: string;
    description: string;
    url: string;
    author?: string;
    source: string;
    publishedAt: string;
    imageUrl?: string;
    size?: "small" | "large";
    isBreaking?: boolean;
    isLive?: boolean;
};

type NewsState = {
    featured: NewsItem | null;
    articles: NewsItem[];
    loading: boolean;
    error: string | null;
};

const initialState: NewsState = {
    featured: null,
    articles: [],
    loading: false,
    error: null,
};

// Async thunk for fetching news
export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async (_, { rejectWithValue }) => {
        try {
            const featuredRes = await fetch(
                "http://localhost:3000/api/news/top-headlines?limit=5"
            );
            const featuredData = await featuredRes.json();

            const generalRes = await fetch(
                "http://localhost:3000/api/news?q=general&limit=20"
            );
            const generalData = await generalRes.json();

            return {
                featured: featuredData.success ? featuredData.articles[0] : null,
                articles: generalData.success ? generalData.articles : [],
            };
        } catch (err) {
            return rejectWithValue("Failed to fetch news");
        }
    }
);

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.featured = action.payload.featured;
                state.articles = action.payload.articles;
                state.loading = false;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default newsSlice.reducer;
