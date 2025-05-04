
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckIcon, XIcon } from 'lucide-react';

// Mock data for results
const mockIdeaData = {
  title: "Mobile App for Local Service Booking",
  description: "An app that connects local service providers with customers, enabling instant booking and payment for services like home cleaning, repairs, etc.",
  score: 82,
  analysis: {
    marketPotential: {
      score: 78,
      details: "The local services market is growing at 15% annually with high smartphone penetration. The total addressable market is estimated at $400B globally.",
      opportunities: [
        "Growing demand for on-demand services",
        "Increasing smartphone adoption in target markets",
        "Shift towards digital payment solutions",
      ],
      challenges: [
        "Fragmented market with regional variations",
        "Seasonal demand fluctuations",
      ],
    },
    competitionAnalysis: {
      score: 65,
      details: "The market has several established players, but there's room for differentiation through specialized services and better user experience.",
      competitors: [
        { name: "ServiceFinder", strengths: "Wide market coverage", weaknesses: "Poor user experience" },
        { name: "QuickFix", strengths: "Strong brand awareness", weaknesses: "Limited service categories" },
        { name: "LocalPro", strengths: "Large service provider network", weaknesses: "Higher commission rates" },
      ],
      differentiators: [
        "Integrated payment and tipping system",
        "Verified provider background checks",
        "Real-time availability scheduling",
      ]
    },
    executionComplexity: {
      score: 85,
      details: "Building the platform requires significant technical resources and operational capabilities for managing the two-sided marketplace.",
      technicalChallenges: [
        "Building a reliable matching algorithm",
        "Real-time availability tracking",
        "Secure payment processing",
      ],
      operationalChallenges: [
        "Service provider verification and quality control",
        "Customer support for two-sided marketplace",
        "Balancing supply and demand across service categories",
      ],
      timeline: "Estimated 8-12 months to build initial version and launch in first market"
    },
  },
  recommendations: [
    "Focus on a specific niche service category initially rather than all local services",
    "Build strong provider verification process to differentiate from competitors",
    "Consider a phased geographical rollout strategy starting with one city",
    "Develop a robust rating and review system to build trust",
  ]
};

// Market size history and projection data
const marketData = [
  { year: 2022, value: 350 },
  { year: 2023, value: 400 },
  { year: 2024, value: 470 },
  { year: 2025, value: 550 },
  { year: 2026, value: 650 },
  { year: 2027, value: 750 },
];

const competitionData = [
  { name: 'Market Share', ServiceFinder: 35, QuickFix: 25, LocalPro: 15, YourApp: 10, Others: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const IdeaResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{mockIdeaData.title}</h1>
            <p className="text-gray-600 mt-2">{mockIdeaData.description}</p>
          </div>
          <div className="flex items-center">
            <div className="text-center">
              <div className="text-5xl font-bold mb-1 gradient-text">{mockIdeaData.score}</div>
              <div className="text-gray-500">Overall Score</div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market Potential</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Idea Summary</CardTitle>
                <CardDescription>Overall analysis of your startup idea</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2 text-teal-600">{mockIdeaData.analysis.marketPotential.score}%</div>
                    <div className="text-gray-600">Market Potential</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2 text-blue-600">{mockIdeaData.analysis.competitionAnalysis.score}%</div>
                    <div className="text-gray-600">Competition Analysis</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2 text-navy-600">{mockIdeaData.analysis.executionComplexity.score}%</div>
                    <div className="text-gray-600">Execution Complexity</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockIdeaData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="text-center">
              <Button size="lg">Download Full Report</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Potential</CardTitle>
                <CardDescription>Score: {mockIdeaData.analysis.marketPotential.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{mockIdeaData.analysis.marketPotential.details}</p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Market Size Projection</h4>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={marketData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`$${value}B`, 'Market Size']} />
                        <Area type="monotone" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Opportunities</h4>
                    <ul className="space-y-2">
                      {mockIdeaData.analysis.marketPotential.opportunities.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Challenges</h4>
                    <ul className="space-y-2">
                      {mockIdeaData.analysis.marketPotential.challenges.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="competition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Competition Analysis</CardTitle>
                <CardDescription>Score: {mockIdeaData.analysis.competitionAnalysis.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{mockIdeaData.analysis.competitionAnalysis.details}</p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Estimated Market Share</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'ServiceFinder', value: 35 },
                              { name: 'QuickFix', value: 25 },
                              { name: 'LocalPro', value: 15 },
                              { name: 'Your App (Projected)', value: 10 },
                              { name: 'Others', value: 15 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {[0, 1, 2, 3, 4].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={competitionData}
                          layout="vertical"
                          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 40]} />
                          <YAxis dataKey="name" type="category" hide />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="ServiceFinder" fill="#0088FE" />
                          <Bar dataKey="QuickFix" fill="#00C49F" />
                          <Bar dataKey="LocalPro" fill="#FFBB28" />
                          <Bar dataKey="YourApp" fill="#FF8042" />
                          <Bar dataKey="Others" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Competitor Analysis</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left border">Competitor</th>
                          <th className="px-4 py-2 text-left border">Strengths</th>
                          <th className="px-4 py-2 text-left border">Weaknesses</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockIdeaData.analysis.competitionAnalysis.competitors.map((competitor, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 border font-medium">{competitor.name}</td>
                            <td className="px-4 py-2 border">{competitor.strengths}</td>
                            <td className="px-4 py-2 border">{competitor.weaknesses}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Your Differentiators</h4>
                  <ul className="space-y-2">
                    {mockIdeaData.analysis.competitionAnalysis.differentiators.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Execution Complexity</CardTitle>
                <CardDescription>Score: {mockIdeaData.analysis.executionComplexity.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{mockIdeaData.analysis.executionComplexity.details}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Technical Challenges</h4>
                    <ul className="space-y-2">
                      {mockIdeaData.analysis.executionComplexity.technicalChallenges.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Operational Challenges</h4>
                    <ul className="space-y-2">
                      {mockIdeaData.analysis.executionComplexity.operationalChallenges.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Estimated Timeline</h4>
                  <p>{mockIdeaData.analysis.executionComplexity.timeline}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IdeaResults;
