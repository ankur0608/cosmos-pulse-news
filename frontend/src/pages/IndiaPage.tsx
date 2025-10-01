import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNewsByCategory } from "@/store/newsSlice"; // 1. Use the category action
import NewsCard from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[170px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    ))}
  </div>
);

const IndiaPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    // 2. Dispatch the action with "India" as the category when the page loads
    dispatch(fetchNewsByCategory("India"));
  }, [dispatch]); // This effect runs once when the component mounts

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="border-b-2 border-primary pb-2 mb-6">
        <h1 className="text-4xl font-serif font-bold text-foreground">
          India News
        </h1>
        <p className="text-muted-foreground mt-1">
          The latest top headlines from India.
        </p>
      </div>

      {loading && <PageSkeleton />}
      {error && <p className="text-center text-destructive py-10">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.url}
              title={article.title}
              description={article.description}
              source={article.source}
              author={article.author || "Unknown"}
              publishedAt={article.publishedAt}
              imageUrl={article.imageUrl || ""}
              url={article.url}
              size="small"
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default IndiaPage;
