
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Validate Your Idea?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Don't risk time and money on an idea that might not work. 
              Get data-driven insights in minutes.
            </p>
            <a 
              href="/validate-idea" 
              className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Validate Your Idea Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
