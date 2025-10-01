import { useState } from "react";
import { Search, Menu, User, X, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink, Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "India", path: "/india" },
  { name: "World", path: "/world" },
  { name: "Business", path: "/business" },
  { name: "Sports", path: "/sports" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Technology", path: "/technology" },
  { name: "Health", path: "/health" },
];

// Sub-component for the Desktop Navigation
const DesktopNav = () => (
  <nav className="hidden lg:flex items-center justify-center gap-x-6">
    {navItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        className={({ isActive }) =>
          `whitespace-nowrap text-sm font-medium transition-colors duration-200 py-2 border-b-2 ${
            isActive
              ? "text-primary border-primary"
              : "text-foreground/70 border-transparent hover:text-primary"
          }`
        }
      >
        {item.name}
      </NavLink>
    ))}
  </nav>
);

// Sub-component for the Mobile Navigation Drawer
const MobileNav = () => (
  <div className="lg:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-3/4 bg-background">
        <div className="flex flex-col h-full">
          <div className="border-b pb-4">
            <Logo />
          </div>
          <nav className="flex flex-col gap-y-4 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg font-medium ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto border-t pt-6 space-y-4">
            <Button variant="outline" className="w-full">
              <User className="h-4 w-4 mr-2" /> Login
            </Button>
            <Button className="w-full bg-primary text-primary-foreground">
              Subscribe
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
);

const Logo = () => (
  <Link to="/" className="flex items-center gap-2" aria-label="Homepage">
    <Newspaper className="h-8 w-8 text-primary" />
    <h1 className="font-serif font-bold text-2xl tracking-tight text-foreground">
      News Herald
    </h1>
  </Link>
);

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery(""); // Clear input after search
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar for date */}
      <div className="bg-secondary/50 text-xs text-muted-foreground">
        <div className="container mx-auto px-4 h-8 flex items-center justify-between">
          <span>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <a
            href="#"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Read e-Paper
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="hidden lg:block">
              <Logo />
            </div>
          </div>

          <div className="lg:hidden">
            <Logo />
          </div>

          <DesktopNav />

          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-40 lg:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <div className="hidden sm:flex items-center gap-x-2">
              <Button variant="ghost">
                <User className="h-4 w-4 mr-2" /> Login
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
