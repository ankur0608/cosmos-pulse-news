// breakingNewsSlice.ts (Perfected)
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "./apiConfig"; // <-- This will now work

// 1. Define and export the type for a single news item
export type BreakingNewsItem = {
  title: string;
  url: string;
};

// (Optional) Define the shape of the raw API article
type ApiArticle = {
  title: string;
  url: string;
  // ... any other properties that come from the API
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
      if (!API_BASE_URL) {
        throw new Error("Backend URL is not configured.");
      }
      
    const res = await fetch(`${API_BASE_URL}/news/top-headlines`);

      // 1. Add check for HTTP errors (like 404, 500)
      if (!res.ok) {
        return rejectWithValue(`Error: ${res.status} ${res.statusText}`);
      }

      // 2. Define the expected API response structure
      const data: { success: boolean; articles: ApiArticle[]; message?: string } =
        await res.json();

      if (data.success) {
        // 3. Use the ApiArticle type to be fully type-safe
        const articles: BreakingNewsItem[] = data.articles
          .slice(0, 5)
          .map((article: ApiArticle) => ({ // <-- No more 'any'
            title: article.title,
            url: article.url,
          }));
        return articles;
      }
      
      // 4. Handle API-level errors
      return rejectWithValue(data.message || "API reported an error");
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
      .addCase(
        fetchBreakingNews.fulfilled,
        (state, action: PayloadAction<BreakingNewsItem[]>) => {
          state.articles = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchBreakingNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // This is good
      });
  },
});

export default breakingNewsSlice.reducer;