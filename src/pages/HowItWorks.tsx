
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6">How VentureCompass Works</h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
              Our data-driven approach helps you validate your startup idea before you invest significant time and money.
            </p>
          </div>
        </div>

        <div className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">1</div>
                      <div className="text-xl">Submit Your Idea</div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl font-bold mb-4">Share Your Vision</h2>
                  <p className="text-gray-600 mb-4">
                    Fill out our comprehensive idea submission form with details about your startup concept, 
                    target market, revenue model, and unique value proposition.
                  </p>
                  <p className="text-gray-600">
                    The more details you provide, the more accurate and helpful your analysis will be.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">AI-Powered Analysis</h2>
                  <p className="text-gray-600 mb-4">
                    Our advanced algorithms analyze your idea against multiple factors including market potential,
                    competition, execution challenges, and unique differentiators.
                  </p>
                  <p className="text-gray-600">
                    We leverage data from thousands of successful and failed startups to provide accurate insights.
                  </p>
                </div>
                <div>
                  <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">2</div>
                      <div className="text-xl">AI Analysis</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">3</div>
                      <div className="text-xl">Get Detailed Results</div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl font-bold mb-4">Comprehensive Insights</h2>
                  <p className="text-gray-600 mb-4">
                    Receive a detailed report with an overall viability score and breakdown of different aspects of your idea.
                  </p>
                  <p className="text-gray-600">
                    Get specific recommendations on how to refine your idea, identify potential pitfalls, 
                    and capitalize on market opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6">Ready to Test Your Idea?</h3>
              <Button size="lg" asChild>
                <Link to="/validate-idea">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
