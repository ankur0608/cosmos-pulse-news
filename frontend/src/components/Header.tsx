import { useState } from "react";
import { Search, Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "India", path: "/india" },
    { name: "World", path: "/world" },
    { name: "Business", path: "/business" },
    { name: "Sports", path: "/sports" },
    { name: "Entertainment", path: "/entertainment" },
    { name: "Technology", path: "/technology" },
    { name: "Health", path: "/health" },
    { name: "Opinion", path: "/opinion" },
    { name: "Horoscope", path: "/horoscope" },
    { name: "Markets", path: "/markets" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Navigate to a search results page with the query
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="bg-background border-b border-news-border">
      {/* Top bar */}
      <div className="border-b border-news-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-primary font-medium">e-Paper</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4 mr-1" /> Alerts
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-1" /> Login
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex-1 text-center">
            <h1 className="font-serif font-bold text-4xl tracking-wider text-foreground">
              THE <span className="text-primary">NEWS</span> HERALD
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Truth • Integrity • Excellence
            </p>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center space-x-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-news-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-3 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="whitespace-nowrap text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
