
import React from 'react';
import { Trophy, ChartBarIcon, UsersIcon, BriefcaseIcon } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <ChartBarIcon className="h-10 w-10 text-teal-500" />,
      title: "Market Potential Analysis",
      description: "Get detailed insights into market size, growth trends, and opportunity assessment for your startup idea."
    },
    {
      icon: <UsersIcon className="h-10 w-10 text-blue-500" />,
      title: "Competition Mapping",
      description: "Identify direct and indirect competitors, their strengths, weaknesses, and how your idea can differentiate."
    },
    {
      icon: <BriefcaseIcon className="h-10 w-10 text-navy-500" />,
      title: "Execution Challenge Assessment",
      description: "Understand the technical, operational, and financial challenges you'll face when bringing your idea to life."
    },
    {
      icon: <Trophy className="h-10 w-10 text-teal-500" />,
      title: "Success Probability Score",
      description: "Get a comprehensive score that predicts the likelihood of your startup idea succeeding based on multiple factors."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Make Data-Driven Decisions</h2>
          <p className="text-xl text-gray-600">
            Our comprehensive analysis gives you the insights you need to refine your idea or pivot before investing time and money.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-slide-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
