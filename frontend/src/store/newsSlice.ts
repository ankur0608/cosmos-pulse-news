import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "./apiConfig";

// 1️⃣ Article type
export type NewsItem = {
    title: string;
    description: string;
    url: string;
    author: string;
    source: string;
    publishedAt: string;
    imageUrl: string;
};

// 2️⃣ Slice state type
interface NewsState {
    articles: NewsItem[];
    loading: boolean;
    error: string | null;
}

// 3️⃣ Initial state
const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
};

// --- Thunks ---

// Homepage top headlines
export const fetchNews = createAsyncThunk<NewsItem[], void, { rejectValue: string }>(
    "news/fetchNews",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/news/top-headlines?limit=25`);
            if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
            const data: { success: boolean; articles: Array<Partial<NewsItem>>; message?: string } =
                await response.json();

            if (!data.success) return rejectWithValue(data.message || "Failed to fetch news");

            return data.articles.map((article) => ({
                title: article.title || "No title",
                description: article.description || "No description",
                url: article.url || "#",
                source: article.source || "Unknown",
                author: article.author || "Unknown",
                publishedAt: article.publishedAt || new Date().toISOString(),
                imageUrl: article.imageUrl || "/placeholder-image.png",
            }));
        } catch (error) {
            return rejectWithValue((error as Error).message || "Unknown error occurred");
        }
    }
);

// Fetch news by category
export const fetchNewsByCategory = createAsyncThunk<
    NewsItem[],
    string,
    { rejectValue: string }
>("news/fetchNewsByCategory", async (category, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/news/category/${category}`);
        if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

        const data: { success: boolean; articles: Array<Partial<NewsItem>> } = await response.json();

        if (!data.success || !Array.isArray(data.articles)) {
            return rejectWithValue("Invalid response format from server");
        }

        return data.articles.map((article) => ({
            title: article.title || "No title",
            description: article.description || "No description",
            url: article.url || "#",
            source: article.source || "Unknown",
            author: article.author || "Unknown",
            publishedAt: article.publishedAt || new Date().toISOString(),
            imageUrl: article.imageUrl || "/placeholder-image.png",
        }));
    } catch (error) {
        return rejectWithValue((error as Error).message || "Unknown error occurred");
    }
});

// --- Slice ---
const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchNews
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsItem[]>) => {
                state.articles = action.payload;
                state.loading = false;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch news";
            })

            // fetchNewsByCategory
            .addCase(fetchNewsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsByCategory.fulfilled, (state, action: PayloadAction<NewsItem[]>) => {
                state.articles = action.payload;
                state.loading = false;
            })
            .addCase(fetchNewsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch news";
            });
    },
});

export default newsSlice.reducer;
