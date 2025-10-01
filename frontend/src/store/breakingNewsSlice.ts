import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "./apiConfig";

// 1. Define and export the type for a single news item
export type BreakingNewsItem = {
    title: string;
    url: string;
};

// 2. Define the type for the slice's state
interface BreakingNewsState {
    articles: BreakingNewsItem[];
    loading: boolean;
    error: string | null;
}

// 3. Apply the type to your initial state
const initialState: BreakingNewsState = {
    articles: [],
    loading: false,
    error: null,
};

export const fetchBreakingNews = createAsyncThunk<BreakingNewsItem[]>(
    "breakingNews/fetchBreakingNews",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/news/latest`);
            const data = await res.json();

            if (data.success) {
                // The thunk will return a value of type BreakingNewsItem[]
                const articles: BreakingNewsItem[] = data.articles
                    .slice(0, 5)
                    .map((article: any) => ({
                        title: article.title,
                        url: article.url,
                    }));
                return articles;
            }
            return [];
        } catch (err: any) {
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
            .addCase(fetchBreakingNews.fulfilled, (state, action: PayloadAction<BreakingNewsItem[]>) => {
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