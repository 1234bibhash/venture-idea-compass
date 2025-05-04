
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
              Validate Your <span className="gradient-text">Startup Idea</span> With Confidence
            </h1>
            <p className="text-xl text-gray-600 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Don't waste time and money on ideas that won't work. Our AI-powered platform analyzes your startup idea and provides detailed insights on market potential, competition, and execution challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" asChild>
                <Link to="/validate-idea" className="flex items-center gap-2">
                  Validate My Idea <ArrowRightIcon size={16} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
            <div className="pt-4 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <p>No credit card required • Free starter plan available</p>
            </div>
          </div>
          <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-1 card-hover">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-full px-4 py-1 text-white text-sm font-medium">
                  Score: 82/100
                </div>
                <div className="text-gray-500 text-sm">May 4, 2025</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile App for Local Service Booking</h3>
              <div className="space-y-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Market Potential</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">78%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Competition Analysis</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Execution Complexity</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-navy-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
