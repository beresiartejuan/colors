
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import ThemeCustomizer from '@/components/ThemeCustomizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-custom">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
      <ThemeCustomizer />
    </div>
  );
};

export default Index;
