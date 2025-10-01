import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchNews, NewsItem } from "@/store/newsSlice";

import Autoplay from "embla-carousel-autoplay";

import BreakingNews from "@/components/BreakingNews";
import NewsCard from "@/components/NewsCard";
import StockTicker from "@/components/StockTicker";
import HoroscopeWidget from "@/components/HoroscopeWidget";
import newsroomHero from "@/assets/newsroom-hero.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  const popularStories = [
    "Local Hero Saves Family from Fire",
    "New Archaeological Discovery",
    "Tech Startup Gets Major Funding",
    "Weather Alert: Heavy Rains Expected",
  ];

  useEffect(() => {
    // Fetch news only if articles array is empty
    if (articles.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, articles.length]);

  if (loading) return <p className="text-center py-10">Loading news...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  const featuredArticles = articles.slice(0, 5);
  const mainGridArticles = articles.slice(5); // Avoid repeating featured articles

  return (
    <main className="container mx-auto px-4 py-6 flex-1">
      <BreakingNews />

      {/* -------- Featured Slider -------- */}
      {featuredArticles.length > 0 && (
        <div className="mb-10 relative">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Featured Stories
          </h2>

          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselPrevious />
            <CarouselContent>
              {featuredArticles.map((news: NewsItem) => (
                // Use a unique key instead of index for better performance
                <CarouselItem key={news.url}>
                  {/* Pass props that match the updated NewsCard component */}
                  <NewsCard
                    title={news.title}
                    description={news.description}
                    source={news.source || "General"}
                    author={news.author || "Unknown"}
                    publishedAt={news.publishedAt}
                    imageUrl={news.imageUrl || newsroomHero}
                    url={news.url}
                    size="large"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* -------- Main News Grid -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {mainGridArticles.map((news: NewsItem) => (
              // Use a unique key instead of index
              <NewsCard
                key={news.url}
                // Pass props that match the updated NewsCard component
                title={news.title}
                description={news.description}
                source={news.source || "General"}
                author={news.author || "Unknown"}
                publishedAt={news.publishedAt}
                imageUrl={news.imageUrl || newsroomHero}
                url={news.url}
                size="small"
              />
            ))}
          </div>
        </div>

        {/* -------- Sidebar -------- */}
        <aside className="lg:col-span-1 space-y-6">
          <StockTicker />
          <HoroscopeWidget />

          <div className="bg-card border border-news-border rounded-lg p-4">
            <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
              Most Popular
            </h3>
            <ul className="space-y-3">
              {popularStories.map((title, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground hover:text-primary">
                    {title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Index;
