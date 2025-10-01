import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type BreakingNewsItem = {
    title: string;
    url: string;
};

type BreakingNewsState = {
    articles: BreakingNewsItem[];
    loading: boolean;
    error: string | null;
};

const initialState: BreakingNewsState = {
    articles: [],
    loading: false,
    error: null,
};

// Async thunk to fetch breaking news
export const fetchBreakingNews = createAsyncThunk(
    "breakingNews/fetchBreakingNews",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:3000/api/news/latest");
            const data = await res.json();
            if (data.success) {
                const topStories = data.articles.slice(0, 5).map((article: any) => ({
                    title: article.title,
                    url: article.url,
                }));
                return topStories;
            }
            return [];
        } catch (err) {
            return rejectWithValue("Failed to fetch breaking news");
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
                state.error = action.payload as string;
            });
    },
});

export default breakingNewsSlice.reducer;
