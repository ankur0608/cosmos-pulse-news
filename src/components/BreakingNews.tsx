import { AlertCircle } from "lucide-react";
import breakingNewsImg from "@/assets/breaking-news.jpg";

const BreakingNews = () => {
  const breakingStories = [
    "Markets surge as inflation data shows positive trends",
    "Tech giant announces breakthrough in quantum computing",
    "International climate summit reaches historic agreement",
    "New archaeological discovery changes historical timeline"
  ];

  return (
    <div className="relative overflow-hidden rounded-lg mb-6">
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${breakingNewsImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-breaking-news text-white px-3 py-1 rounded mr-4 animate-pulse">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="font-semibold text-sm">BREAKING</span>
              </div>
              <div className="text-white text-sm opacity-80">
                Live Updates
              </div>
            </div>
            
            <div className="overflow-hidden">
              <div className="animate-scroll-up space-y-2">
                {breakingStories.map((story, index) => (
                  <h2 key={index} className="text-white font-serif text-2xl md:text-3xl font-bold leading-tight">
                    {story}
                  </h2>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;