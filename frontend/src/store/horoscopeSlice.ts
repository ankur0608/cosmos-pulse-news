import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    english: {},
    loading: false,
    error: null,
};

const API_BASE_URL = "https://cosmos-pulse-news.onrender.com"

export const fetchHoroscopes = createAsyncThunk(
    "horoscope/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/horoscope/english`);
            const data = await res.json();
            if (!data.success) throw new Error("Failed to fetch horoscopes");
            return data.data.english;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch horoscopes");
        }
    }
);

const horoscopeSlice = createSlice({
    name: "horoscope",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHoroscopes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHoroscopes.fulfilled, (state, action) => {
                state.loading = false;
                state.english = action.payload;
            })
            .addCase(fetchHoroscopes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default horoscopeSlice.reducer;
