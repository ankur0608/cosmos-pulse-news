import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchNewsByCategory, NewsItem } from "@/store/newsSlice";
import NewsCard from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton loader
const PageSkeleton: React.FC = () => (
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

const HealthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    // Fetch health news category
    dispatch(fetchNewsByCategory("Health"));
  }, [dispatch]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="border-b-2 border-primary pb-2 mb-6">
        <h1 className="text-4xl font-serif font-bold text-foreground">
          Health News
        </h1>
        <p className="text-muted-foreground mt-1">
          The latest top headlines from the health world.
        </p>
      </div>

      {/* Loading */}
      {loading && <PageSkeleton />}

      {/* Error */}
      {error && <p className="text-center text-destructive py-10">{error}</p>}

      {/* Articles */}
      {!loading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: NewsItem) => (
            <NewsCard
              key={article.url}
              title={article.title}
              description={article.description}
              source={article.source}
              author={article.author}
              publishedAt={article.publishedAt}
              imageUrl={article.imageUrl}
              url={article.url}
              size="small"
            />
          ))}
        </div>
      )}

      {/* No articles */}
      {!loading && !error && articles.length === 0 && (
        <p className="text-center py-10 text-muted-foreground">
          No health news articles available.
        </p>
      )}
    </main>
  );
};

export default HealthPage;
