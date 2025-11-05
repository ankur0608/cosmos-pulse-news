// BreakingNews.tsx (Perfected)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchBreakingNews, BreakingNewsItem } from "@/store/breakingNewsSlice";
import { AlertCircle, AlertTriangle } from "lucide-react";
import breakingNewsImg from "@/assets/breaking-news.jpg";

const BreakingNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector( // <-- 1. Get error state
    (state: RootState) => state.breakingNews
  );

  useEffect(() => {
    dispatch(fetchBreakingNews());
  }, [dispatch]);

  // 2. Render content based on all possible states
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-white text-center text-lg">
          Loading breaking news...
        </div>
      );
    }

    if (error) { // <-- 3. Handle Error State
      return (
        <div className="flex flex-col items-center justify-center text-red-300">
          <AlertTriangle className="h-10 w-10 mb-2" />
          <h3 className="text-xl font-semibold mb-1">Failed to Load News</h3>
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    if (articles.length === 0) { // <-- 4. Handle Empty State
      return (
        <div className="text-white text-center text-lg opacity-80">
          No breaking news at the moment.
        </div>
      );
    }

    return (
      <div className="overflow-hidden">
        <div className="animate-scroll-up space-y-2">
          {articles.map((story: BreakingNewsItem, index: number) => (
            <a
              key={index}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-serif text-2xl md:text-3xl font-bold leading-tight hover:underline block"
            >
              {story.title}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg mb-6">
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${breakingNewsImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            {!loading && !error && articles.length > 0 && ( // <-- Only show this if we have news
              <div className="flex items-center mb-4">
                <div className="flex items-center bg-breaking-news text-white px-3 py-1 rounded mr-4 animate-pulse">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="font-semibold text-sm">BREAKING</span>
                </div>
                <div className="text-white text-sm opacity-80">Live Updates</div>
              </div>
            )}
            
            {/* 5. Render the state-driven content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;