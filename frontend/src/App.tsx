import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
// import Markets from "./pages/Markets";
import Weather from "./pages/Weather";
import ZodiacIndex from "./pages/horoscope/ZodiacIndex";
import ZodiacDetailPage from "./pages/horoscope/ZodiacDetailPage";
import IndiaPage from "./pages/IndiaPage";
import SportsPage from "./pages/sports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* All pages share Header + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/markets" element={<Markets />} /> */}
            <Route path="/india" element={<IndiaPage />} />
            <Route path="/horoscope" element={<ZodiacIndex />} />
            <Route path="/Sports" element={<SportsPage />} />

            <Route path="/horoscope/:sign" element={<ZodiacDetailPage />} />
            <Route path="/weather" element={<Weather />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
