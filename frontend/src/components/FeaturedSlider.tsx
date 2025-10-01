import React from "react";
import { NewsItem } from "@/store/newsSlice";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import newsroomHero from "@/assets/newsroom-hero.jpg";

// --- NewsCard Component (No changes needed here) ---
interface NewsCardProps {
  title: string;
  description: string | null;
  source: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  url: string;
  size?: "small" | "large";
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  source,
  publishedAt,
  imageUrl,
  url,
  size = "small",
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (size === "large") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] text-white">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
            <p className="text-sm font-semibold text-gray-200 mb-2">{source}</p>
            <h3 className="text-2xl md:text-3xl font-serif font-extrabold leading-tight mb-2 group-hover:underline underline-offset-4">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-100 hidden sm:block">
                {description.substring(0, 100)}...
              </p>
            )}
          </div>
        </div>
      </a>
    );
  }

  // Small card for grid layout
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">
            {source}
          </p>
          <CardTitle className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground flex-grow">
            {description ? `${description.substring(0, 80)}...` : ""}
          </p>
          <p className="text-xs text-muted-foreground mt-4">{formattedDate}</p>
        </CardContent>
      </Card>
    </a>
  );
};

// --- Featured Slider Component ---
interface FeaturedSliderProps {
  articles: NewsItem[];
}

const FeaturedSlider = React.memo(({ articles }: FeaturedSliderProps) => (
  <section aria-labelledby="featured-stories-title" className="mb-12">
    <h2
      id="featured-stories-title"
      className="text-3xl font-serif font-bold mb-4 text-foreground border-b-2 border-primary pb-2"
    >
      Featured Stories
    </h2>
    <Carousel
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {articles.map((news) => (
          <CarouselItem key={news.url}>
            <NewsCard
              title={news.title}
              description={news.description}
              source={"General"}
              author={news.author || "Unknown"}
              publishedAt={news.publishedAt}
              // FIXED: Changed from news.urlToImage to news.imageUrl to match your API data
              imageUrl={news.imageUrl || newsroomHero}
              url={news.url}
              size="large"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex left-2" />
      <CarouselNext className="hidden sm:flex right-2" />
    </Carousel>
  </section>
));

export default FeaturedSlider;
