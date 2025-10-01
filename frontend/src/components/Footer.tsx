// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-3">
              The News Herald
            </h4>
            <p className="text-sm opacity-80">
              Your trusted source for accurate, timely news and analysis.
            </p>
          </div>

          {/* Sections */}
          <nav>
            <h5 className="font-semibold mb-3">Sections</h5>
            <ul className="space-y-1 text-sm opacity-80">
              <li>
                <Link to="/" className="hover:opacity-100">
                  India
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-100">
                  World
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-100">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-100">
                  Sports
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav>
            <h5 className="font-semibold mb-3">Services</h5>
            <ul className="space-y-1 text-sm opacity-80">
              <li>
                <Link to="/markets" className="hover:opacity-100">
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/horoscope" className="hover:opacity-100">
                  Horoscope
                </Link>
              </li>
              <li>
                <Link to="/weather" className="hover:opacity-100">
                  Weather
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-100">
                  E-Paper
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <nav>
            <h5 className="font-semibold mb-3">Connect</h5>
            <ul className="space-y-1 text-sm opacity-80">
              <li>
                <Link to="/" className="hover:opacity-100">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-100">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-100">
                  Advertise
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:opacity-100">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-6 pt-6 text-center text-sm opacity-60">
          <p>
            &copy; {new Date().getFullYear()} The News Herald. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
