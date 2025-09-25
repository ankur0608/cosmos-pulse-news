import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import NewsCard from "@/components/NewsCard";
import StockTicker from "@/components/StockTicker";
import HoroscopeWidget from "@/components/HoroscopeWidget";
import newsroomHero from "@/assets/newsroom-hero.jpg";
import stockMarket from "@/assets/stock-market.jpg";

const Index = () => {
  // Sample news data
  const newsData = [
    {
      title: "Economic Recovery Shows Strong Signs as GDP Growth Exceeds Expectations",
      summary: "Latest quarterly reports indicate robust economic performance across multiple sectors, with technology and healthcare leading the charge.",
      category: "Business",
      author: "Rajesh Kumar",
      publishedAt: "2 hours ago",
      imageUrl: stockMarket,
      size: "large" as const
    },
    {
      title: "Climate Summit Reaches Historic Agreement on Carbon Emissions",
      summary: "World leaders commit to ambitious new targets for reducing global carbon footprint by 2030.",
      category: "World",
      author: "Sarah Johnson",
      publishedAt: "4 hours ago",
      imageUrl: newsroomHero,
      isBreaking: true
    },
    {
      title: "Tech Innovation Hub Launches in Bangalore",
      summary: "New facility aims to foster startup ecosystem and drive technological advancement.",
      category: "Technology",
      author: "Amit Sharma",
      publishedAt: "6 hours ago"
    },
    {
      title: "Healthcare System Receives Major Investment Boost",
      summary: "Government announces comprehensive healthcare infrastructure development plan.",
      category: "Health",
      author: "Dr. Priya Nair",
      publishedAt: "8 hours ago"
    },
    {
      title: "Sports Championship Sets New Viewership Records",
      summary: "Millions tune in as local team advances to finals in international tournament.",
      category: "Sports",
      author: "Vikram Singh",
      publishedAt: "10 hours ago",
      isLive: true
    },
    {
      title: "Education Reform Bill Passes Parliament",
      summary: "Sweeping changes to curriculum and teaching methods approved by lawmakers.",
      category: "India",
      author: "Meera Gupta",
      publishedAt: "12 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <BreakingNews />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main news content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {newsData.map((news, index) => (
                <NewsCard
                  key={index}
                  title={news.title}
                  summary={news.summary}
                  category={news.category}
                  author={news.author}
                  publishedAt={news.publishedAt}
                  imageUrl={news.imageUrl}
                  isBreaking={news.isBreaking}
                  isLive={news.isLive}
                  size={news.size}
                />
              ))}
            </div>

            {/* Section headers and more news */}
            <div className="space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  India News
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NewsCard
                    title="Infrastructure Development Project Completed Ahead of Schedule"
                    summary="Major highway project connecting three states finished six months early, boosting regional connectivity."
                    category="India"
                    author="Suresh Reddy"
                    publishedAt="1 day ago"
                    size="small"
                  />
                  <NewsCard
                    title="Digital India Initiative Reaches New Milestone"
                    summary="Rural connectivity program successfully brings high-speed internet to remote villages across the country."
                    category="India"
                    author="Anjali Patel"
                    publishedAt="1 day ago"
                    size="small"
                  />
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
                  World News
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NewsCard
                    title="International Space Station Mission Launches Successfully"
                    summary="Multi-national crew begins six-month mission conducting groundbreaking scientific research."
                    category="World"
                    author="James Wilson"
                    publishedAt="2 days ago"
                    size="small"
                  />
                  <NewsCard
                    title="Global Trade Summit Addresses Supply Chain Challenges"
                    summary="Economic leaders discuss strategies to strengthen international commerce and reduce dependencies."
                    category="World"
                    author="Emma Thompson"
                    publishedAt="2 days ago"
                    size="small"
                  />
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <StockTicker />
            <HoroscopeWidget />
            
            {/* Popular Stories */}
            <div className="bg-card border border-news-border rounded-lg p-4">
              <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">
                Most Popular
              </h3>
              <div className="space-y-3">
                {["Local Hero Saves Family from Fire", "New Archaeological Discovery", "Tech Startup Gets Major Funding", "Weather Alert: Heavy Rains Expected"].map((title, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 hover:bg-secondary/50 rounded cursor-pointer transition-colors">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium text-foreground hover:text-primary">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="bg-secondary/30 border border-news-border rounded-lg p-4">
              <h3 className="font-serif text-lg font-semibold mb-2 text-foreground">
                Stay Updated
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get the latest news delivered to your inbox.
              </p>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm border border-news-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="w-full bg-primary text-primary-foreground py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-serif font-bold text-lg mb-3">The News Herald</h4>
              <p className="text-sm opacity-80">
                Your trusted source for accurate, timely news and analysis.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Sections</h5>
              <ul className="space-y-1 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">India</a></li>
                <li><a href="#" className="hover:opacity-100">World</a></li>
                <li><a href="#" className="hover:opacity-100">Business</a></li>
                <li><a href="#" className="hover:opacity-100">Sports</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Services</h5>
              <ul className="space-y-1 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Markets</a></li>
                <li><a href="#" className="hover:opacity-100">Horoscope</a></li>
                <li><a href="#" className="hover:opacity-100">Weather</a></li>
                <li><a href="#" className="hover:opacity-100">E-Paper</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Connect</h5>
              <ul className="space-y-1 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Subscribe</a></li>
                <li><a href="#" className="hover:opacity-100">Contact Us</a></li>
                <li><a href="#" className="hover:opacity-100">Advertise</a></li>
                <li><a href="#" className="hover:opacity-100">About</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-6 pt-6 text-center text-sm opacity-60">
            <p>&copy; 2025 The News Herald. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;