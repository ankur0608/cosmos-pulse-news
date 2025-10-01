import { Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns"; // Recommended for consistent date formatting
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Interface updated to match the data model from the Redux slice
interface NewsCardProps {
  title: string;
  description: string; // Changed from 'summary'
  source: string; // Changed from 'category'
  author: string;
  url: string; // Added URL for navigation
  publishedAt: string;
  imageUrl?: string;
  isBreaking?: boolean;
  isLive?: boolean;
  size?: "default" | "large" | "small";
}

const NewsCard = ({
  title,
  description, // Use 'description'
  source, // Use 'source'
  author,
  url,
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

  // Format the date for a clean, consistent look
  const formattedDate = format(new Date(publishedAt), "MMM d, yyyy h:mm a");

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      onClick={handleClick}
      className={`${sizeClasses[size]} group cursor-pointer hover:shadow-lg transition-all duration-300 border-news-border flex flex-col`}
    >
      <CardContent className="p-0 flex flex-col flex-grow">
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

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="outline"
              className="text-category-tag border-category-tag"
            >
              {source?.toUpperCase() || "GENERAL"} {/* Use 'source' prop */}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate} {/* Display formatted date */}
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
            {description} {/* Use 'description' prop */}
          </p>

          <div className="flex items-center justify-between mt-auto pt-2">
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
