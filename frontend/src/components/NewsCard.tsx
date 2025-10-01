import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  isBreaking?: boolean; // For top breaking news
  isLive?: boolean; // Optional live status
  size?: "default" | "large" | "small";
}

const NewsCard = ({
  title,
  summary,
  category,
  author,
  publishedAt,
  imageUrl,
  isBreaking = false,
  isLive = false,
  size = "default",
}: NewsCardProps) => {
  const sizeClasses = {
    small: "col-span-1",
    default: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-3",
  };

  return (
    <Card
      className={`${sizeClasses[size]} group cursor-pointer hover:shadow-lg transition-all duration-300 border-news-border`}
    >
      <CardContent className="p-0">
        {imageUrl && (
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isBreaking && (
              <Badge className="absolute top-3 left-3 bg-breaking-news text-white animate-pulse">
                BREAKING
              </Badge>
            )}
            {isLive && (
              <div className="absolute top-3 right-3 flex items-center bg-black/80 text-white px-2 py-1 rounded text-xs">
                <div className="w-2 h-2 bg-live-indicator rounded-full mr-1 animate-pulse"></div>
                LIVE
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="outline"
              className="text-category-tag border-category-tag"
            >
              {category.toUpperCase()}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(publishedAt).toLocaleString()} {/* format nicely */}
            </div>
          </div>

          <h3
            className={`font-serif font-semibold mb-2 group-hover:text-primary transition-colors ${
              size === "large"
                ? "text-xl"
                : size === "small"
                ? "text-sm"
                : "text-base"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-muted-foreground mb-3 line-clamp-2 ${
              size === "large" ? "text-base" : "text-sm"
            }`}
          >
            {summary}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              By {author || "Unknown"}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
