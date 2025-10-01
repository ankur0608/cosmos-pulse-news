import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import horoscopeReducer from "./horoscopeSlice";
import breakingNews from "./breakingNewsSlice"
// import fetchFinancials from "./financialsSlice";
export const store = configureStore({
    reducer: {
        news: newsReducer,
        horoscope: horoscopeReducer,
        breakingNews,
        // financials,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
