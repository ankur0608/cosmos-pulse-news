import React from "react";
import { NewsItem } from "@/store/newsSlice";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import StockTicker from "@/components/StockTicker";
import HoroscopeWidget from "@/components/HoroscopeWidget";
import newsroomHero from "@/assets/newsroom-hero.jpg";

// --- NewsCard Component (Helper for this section) ---
// NOTE: Ideally, this would be in its own file and imported.
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
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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

// --- Sub-components for LatestNewsSection ---

const MainNewsGrid = React.memo(({ articles }: { articles: NewsItem[] }) => (
  <section aria-labelledby="latest-news-title">
    <h2
      id="latest-news-title"
      className="text-3xl font-serif font-bold mb-4 text-foreground border-b-2 border-primary pb-2"
    >
      Latest News
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((news) => (
        <NewsCard
          key={news.url}
          title={news.title}
          description={news.description}
          source={news.source?.name || "General"}
          author={news.author || "Unknown"}
          publishedAt={news.publishedAt}
          // FIXED: Changed from news.urlToImage to news.imageUrl
          imageUrl={news.imageUrl || newsroomHero}
          url={news.url}
          size="small"
        />
      ))}
    </div>
  </section>
));

const Sidebar = () => {
  const popularStories = [
    "Local Hero Saves Family from Fire",
    "New Archaeological Discovery",
    "Tech Startup Gets Major Funding",
    "Weather Alert: Heavy Rains Expected",
  ];

  return (
    <aside className="lg:col-span-1 space-y-8 pt-14">
      <StockTicker />
      <HoroscopeWidget />
      <section aria-labelledby="popular-stories-title">
        <Card>
          <CardContent className="p-4">
            <h3
              id="popular-stories-title"
              className="font-serif text-lg font-semibold mb-4 text-foreground"
            >
              Most Popular
            </h3>
            <ul className="space-y-3">
              {popularStories.map((title, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors group"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary">
                    {title}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </aside>
  );
};

// --- Main Exported Component ---
interface LatestNewsSectionProps {
  articles: NewsItem[];
}

const LatestNewsSection = ({ articles }: LatestNewsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-12">
      <div className="lg:col-span-3">
        <MainNewsGrid articles={articles} />
      </div>
      <Sidebar />
    </div>
  );
};

export default LatestNewsSection;
