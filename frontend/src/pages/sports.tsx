"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNewsByCategory } from "@/store/newsSlice"; // ✅ use this
import NewsCard from "@/components/NewsCard";

export default function SportsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNewsByCategory("sports")); // ✅ pass sports category
  }, [dispatch]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-serif font-bold mb-6 border-b-2 border-primary pb-2">
        Sports News
      </h1>

      {loading && <p className="text-gray-500">Loading sports news...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((news) => (
          <NewsCard
            key={news.url}
            title={news.title}
            description={news.description}
            source={news.source || "General"}
            author={news.author || "Unknown"}
            publishedAt={news.publishedAt}
            imageUrl={news.imageUrl}
            url={news.url}
            size="small"
          />
        ))}
      </div>
    </main>
  );
}
