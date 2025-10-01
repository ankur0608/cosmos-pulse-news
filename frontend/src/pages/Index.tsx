import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchNews, NewsItem } from "@/store/newsSlice";

import { Skeleton } from "@/components/ui/skeleton";
import BreakingNews from "@/components/BreakingNews";
import FeaturedSlider from "@/components/FeaturedSlider";
import LatestNewsSection from "@/components/LatestNewsSection";

// --- Helper & Loading Components ---

const SkeletonCard = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <p className="text-2xl text-destructive mb-2">😟 Oops!</p>
    <p className="text-destructive">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
    >
      Try Again
    </button>
  </div>
);

// --- Main Page Component ---

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, articles.length]);

  const { featuredArticles, mainGridArticles } = useMemo(() => {
    return {
      featuredArticles: articles.slice(0, 5),
      mainGridArticles: articles.slice(5),
    };
  }, [articles]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="w-full h-[400px] md:h-[500px] mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg-col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 flex-1 space-y-8">
      <BreakingNews />

      <FeaturedSlider articles={featuredArticles} />

      <LatestNewsSection articles={mainGridArticles} />
    </main>
  );
};

export default Index;
