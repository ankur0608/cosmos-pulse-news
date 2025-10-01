// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "./components/ScrollTop";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <ScrollTop />

      {/* Main content from child routes */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
