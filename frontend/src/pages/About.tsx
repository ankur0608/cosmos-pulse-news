// src/pages/About.tsx
import React from "react";

const About = () => {
  return (
    <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-6">
        About Us
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        Welcome to <strong className="text-foreground">The News Herald</strong>{" "}
        – your trusted destination for breaking news, in-depth analysis, and
        real-time updates. Our team of dedicated journalists strives to bring
        you unbiased and accurate coverage of India, world, business, sports,
        lifestyle, and more.
      </p>
      <p className="text-lg text-muted-foreground leading-relaxed">
        With a commitment to truth, speed, and clarity, The News Herald
        continues to grow as one of the leading digital news platforms,
        empowering readers with knowledge every day.
      </p>
    </section>
  );
};

export default About;
