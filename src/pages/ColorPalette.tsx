
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import ThemeCustomizer from '@/components/ThemeCustomizer';

const ColorPalette: React.FC = () => {
  return (
    <div className="min-h-screen bg-custom-bg text-custom-text" style={{ fontFamily: 'var(--custom-font-family)' }}>
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

export default ColorPalette;
