import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckIcon, XIcon, Download, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { toast } from "sonner";

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
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [ideaData, setIdeaData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Get form data from location state or localStorage
    const formData = location.state?.formData || 
      JSON.parse(localStorage.getItem('ideaFormData') || '{}');
    
    if (formData.title) {
      analyzeIdea(formData);
    } else {
      setIsLoading(false);
      setIdeaData(generateMockData("Sample Idea"));
    }
  }, [location]);

  const analyzeIdea = (formData: any) => {
    setIsLoading(true);

    // In a real app, this would be an API call to an AI service
    // For now, we'll simulate the analysis with a timeout
    setTimeout(() => {
      const analyzedData = generateAnalysisData(formData);
      setIdeaData(analyzedData);
      setIsLoading(false);
    }, 1500);
  };

  const generateAnalysisData = (formData: any) => {
    const title = formData.title || "Sample Idea";
    const description = formData.description || "No description provided";
    const industry = formData.industry || "Technology";
    
    // Generate more authentic scores based on the idea
    let marketScore = 0;
    let competitionScore = 0;
    let executionScore = 0;
    
    // Analyze based on industry and description
    if (industry === "Technology" || description.toLowerCase().includes("tech") || 
        description.toLowerCase().includes("software") || description.toLowerCase().includes("ai")) {
      
      // Score AI, SaaS, or platform related ideas
      if (description.toLowerCase().includes("ai") || 
          description.toLowerCase().includes("artificial intelligence")) {
        marketScore = 85;
        competitionScore = 60;  // Highly competitive
        executionScore = 70;
      } else if (description.toLowerCase().includes("saas") || 
                description.toLowerCase().includes("platform") || 
                description.toLowerCase().includes("software")) {
        marketScore = 78;
        competitionScore = 65;
        executionScore = 75;
      }

      // Specific competitor analysis for project management tools
      if (description.toLowerCase().includes("project management") || 
          description.toLowerCase().includes("jira") || 
          description.toLowerCase().includes("agile")) {
        return generateProjectManagementToolData(formData);
      }
    }
    
    // Default case if no specific analysis pattern matched
    if (marketScore === 0) {
      marketScore = Math.floor(Math.random() * 20) + 65;  // Base score between 65-85
      competitionScore = Math.floor(Math.random() * 30) + 50; // Base score between 50-80
      executionScore = Math.floor(Math.random() * 25) + 65; // Base score between 65-90
    }
    
    const overallScore = Math.floor((marketScore + competitionScore + executionScore) / 3);
    
    return {
      title,
      description,
      score: overallScore,
      analysis: {
        marketPotential: {
          score: marketScore,
          details: `The ${industry} market is expected to grow at 12% annually. The total addressable market is estimated at $250B globally.`,
          opportunities: [
            "Growing demand for innovative solutions",
            "Increasing digital transformation in target industries",
            "Shift towards cloud-based solutions",
          ],
          challenges: [
            "Crowded market with established players",
            "High customer acquisition costs",
          ],
        },
        competitionAnalysis: {
          score: competitionScore,
          details: `The ${industry} market has several established players, but there's room for differentiation through specialized features and better user experience.`,
          competitors: [
            { name: "Established Player A", strengths: "Market leader with strong brand", weaknesses: "Dated technology stack" },
            { name: "Growing Rival B", strengths: "Modern UX design", weaknesses: "Limited feature set" },
            { name: "Startup C", strengths: "Innovative approach", weaknesses: "Small market share" },
          ],
          differentiators: [
            "More intuitive user experience",
            "Specialized features for specific customer segments",
            "Integration capabilities",
          ]
        },
        executionComplexity: {
          score: executionScore,
          details: `Building a solution in the ${industry} space requires significant resources and domain expertise.`,
          technicalChallenges: [
            "Building scalable architecture",
            "Ensuring data security and compliance",
            "Creating intuitive user interfaces",
          ],
          operationalChallenges: [
            "Customer acquisition in a competitive market",
            "Building a skilled technical team",
            "Managing operational costs",
          ],
          timeline: "Estimated 10-14 months to build initial version and launch in first market"
        },
      },
      recommendations: [
        "Focus on a specific niche within the market initially",
        "Develop clear differentiation strategy against key competitors",
        "Consider a phased product roadmap to validate core features",
        "Build a strong customer support process to drive retention",
      ]
    };
  };

  // Specific data generator for project management/Jira alternatives
  const generateProjectManagementToolData = (formData: any) => {
    const title = formData.title || "Agile Project Management Platform";
    const description = formData.description || "A modern project management solution";
    
    // Market size data for project management software
    const marketData = [
      { year: 2022, value: 5.8 },
      { year: 2023, value: 6.7 },
      { year: 2024, value: 7.9 },
      { year: 2025, value: 9.2 },
      { year: 2026, value: 11.4 },
      { year: 2027, value: 13.8 },
    ];

    // Real competitor data for project management space
    const competitorMarketShare = [
      { name: 'Market Share', Jira: 32, Monday: 15, Asana: 12, ClickUp: 9, Notion: 8, Linear: 5, YourApp: 3, Others: 16 },
    ];
    
    // For a Jira/Confluence alternative
    if (description.toLowerCase().includes("jira") || 
        description.toLowerCase().includes("confluence") || 
        description.toLowerCase().includes("atlassian")) {
      return {
        title,
        description,
        score: 76,
        marketData,
        competitorMarketShare,
        analysis: {
          marketPotential: {
            score: 85,
            details: "The project management software market is valued at $6.7B in 2023 and projected to reach $13.8B by 2027, growing at a CAGR of 19.8%. The shift to remote work has accelerated adoption of digital collaboration tools.",
            opportunities: [
              "Growing frustration with bloated enterprise tools",
              "Demand for unified workspaces with integrated knowledge management",
              "Rising need for AI-powered features to improve productivity",
              "Shift toward team autonomy and faster decision making"
            ],
            challenges: [
              "High switching costs for organizations already on established platforms",
              "Enterprise procurement processes favor established vendors",
              "Need for extensive integrations with existing toolchains"
            ],
          },
          competitionAnalysis: {
            score: 68,
            details: "The market is dominated by Atlassian's suite (Jira, Confluence) with strong competition from newer players like Monday.com, Asana, and Linear. Enterprise customers show growing willingness to switch for better user experience and integrated AI capabilities.",
            competitors: [
              { 
                name: "Atlassian (Jira/Confluence)", 
                strengths: "Enterprise adoption, extensive ecosystem, customizability", 
                weaknesses: "Complex UI, slow performance, fragmented experience across products" 
              },
              { 
                name: "Monday.com", 
                strengths: "Visual interface, no-code automation", 
                weaknesses: "Less powerful for software development, becoming feature-bloated" 
              },
              { 
                name: "Linear", 
                strengths: "Modern UI, fast performance, software-focused", 
                weaknesses: "Limited knowledge management, narrow focus on engineering" 
              },
              { 
                name: "ClickUp", 
                strengths: "All-in-one platform, customizable", 
                weaknesses: "Complex onboarding, overwhelming feature set" 
              },
              { 
                name: "Notion", 
                strengths: "Flexible knowledge management, good adoption", 
                weaknesses: "Weak project management, limited structure for teams" 
              }
            ],
            differentiators: [
              "Native AI integration throughout the product experience",
              "Unified workspace replacing multiple fragmented tools",
              "Performance-first design with instant interactions",
              "Purpose-built for modern agile and product teams"
            ]
          },
          executionComplexity: {
            score: 75,
            details: "Building a competitive platform in this space requires significant investment in product design, engineering quality, and feature parity with established players.",
            technicalChallenges: [
              "Building a high-performance frontend with real-time collaboration",
              "Developing effective AI assistants for knowledge work",
              "Creating a flexible data model that supports various workflows",
              "Ensuring enterprise-grade security and compliance"
            ],
            operationalChallenges: [
              "Competing against well-funded competitors with large sales teams",
              "Building trust with enterprise customers as a new entrant",
              "Supporting migration from existing tools with minimal friction",
              "Scaling customer success for different team sizes and industries"
            ],
            timeline: "Estimated 12-18 months for MVP, with 2-3 years to reach feature parity with market leaders"
          },
        },
        recommendations: [
          "Target frustration points of Jira/Confluence users with specific feature improvements",
          "Focus initial go-to-market on tech-forward mid-sized companies (50-500 employees)",
          "Build a compelling free tier to drive bottom-up adoption within teams",
          "Prioritize migration tools from Jira and Confluence to reduce switching barriers",
          "Develop AI capabilities that demonstrate clear productivity improvements over competitors"
        ]
      };
    }
    
    // Generic project management tool
    return {
      title,
      description,
      score: 72,
      marketData,
      competitorMarketShare,
      analysis: {
        marketPotential: {
          score: 80,
          details: "The project management software market is growing at 19.8% annually with a total addressable market of $6.7B in 2023, projected to reach $13.8B by 2027.",
          opportunities: [
            "Growing adoption of digital work management tools",
            "Demand for better user experience and modern interfaces",
            "Increasing need for remote collaboration features",
          ],
          challenges: [
            "Highly competitive market with established players",
            "High customer acquisition costs and switching barriers",
          ],
        },
        competitionAnalysis: {
          score: 65,
          details: "The project management space has several established players, including Atlassian, Monday.com, Asana, ClickUp, and more. Differentiation through UX and specialized features is key.",
          competitors: [
            { name: "Jira (Atlassian)", strengths: "Enterprise adoption, extensive customization", weaknesses: "Complex UI, steep learning curve" },
            { name: "Monday.com", strengths: "Visual interface, no-code automation", weaknesses: "Becoming increasingly complex" },
            { name: "Asana", strengths: "Clean UX, good task management", weaknesses: "Limited advanced features" },
            { name: "ClickUp", strengths: "Feature-rich, all-in-one solution", weaknesses: "Can be overwhelming for new users" },
          ],
          differentiators: [
            "More intuitive user experience",
            "Specialized features for agile teams",
            "Native AI capabilities for productivity",
            "Better performance and speed"
          ]
        },
        executionComplexity: {
          score: 70,
          details: "Building a competitive project management tool requires significant investment in UX design, feature development, and performance optimization.",
          technicalChallenges: [
            "Building a responsive and intuitive interface",
            "Implementing real-time collaboration features",
            "Creating a flexible but powerful data model",
          ],
          operationalChallenges: [
            "Customer acquisition in a crowded market",
            "Supporting enterprise security requirements",
            "Building integration ecosystem with other tools",
          ],
          timeline: "Estimated 10-14 months to build initial version with core features"
        },
      },
      recommendations: [
        "Focus on specific user persona with clear pain points in existing tools",
        "Prioritize performance and UX as key differentiators",
        "Consider a freemium model to drive initial adoption",
        "Build migration tools to make switching easier from competitors",
      ]
    };
  };

  // Generate mock data when no specific analysis is available
  const generateMockData = (title: string) => {
    // Default mock data
    return {
      title,
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
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const handleGenerateBusinessPlan = () => {
    setIsGeneratingPlan(true);
    
    // Simulate business plan generation
    setTimeout(() => {
      setIsGeneratingPlan(false);
      toast.success("Business plan generated successfully!");
      
      // In a real app, this would trigger a download or open a new tab
      // For demo purposes, we'll just log to console
      console.log("Business plan generated for:", ideaData.title);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Analyzing your idea...</h2>
          <p className="text-gray-600 mb-8">We're examining market potential, competition, and execution complexity</p>
          <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!ideaData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">No idea data available</h2>
          <p className="text-gray-600">Please submit an idea for analysis</p>
        </div>
      </div>
    );
  }

  // Use the marketData from the analysis or fallback to default
  const marketData = ideaData.marketData || [
    { year: 2022, value: 350 },
    { year: 2023, value: 400 },
    { year: 2024, value: 470 },
    { year: 2025, value: 550 },
    { year: 2026, value: 650 },
    { year: 2027, value: 750 },
  ];

  // Use the competition data from the analysis or fallback to default
  const competitionData = ideaData.competitorMarketShare || [
    { name: 'Market Share', ServiceFinder: 35, QuickFix: 25, LocalPro: 15, YourApp: 10, Others: 15 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{ideaData.title}</h1>
            <p className="text-gray-600 mt-2">{ideaData.description}</p>
          </div>
          <div className="flex items-center">
            <div className="text-center">
              <div className="text-5xl font-bold mb-1 gradient-text">{ideaData.score}</div>
              <div className="text-gray-500">Overall Score</div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="businessplan">Business Plan</TabsTrigger>
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
                    <div className="text-3xl font-bold mb-2 text-teal-600">{ideaData.analysis.marketPotential.score}%</div>
                    <div className="text-gray-600">Market Potential</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2 text-blue-600">{ideaData.analysis.competitionAnalysis.score}%</div>
                    <div className="text-gray-600">Competition Analysis</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2 text-navy-600">{ideaData.analysis.executionComplexity.score}%</div>
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
                  {ideaData.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex justify-center space-x-4">
              <Button size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
              <Button size="lg" variant="outline" onClick={handleGenerateBusinessPlan} disabled={isGeneratingPlan}>
                <FileText className="mr-2 h-4 w-4" />
                {isGeneratingPlan ? "Generating..." : "Generate Business Plan"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Potential</CardTitle>
                <CardDescription>Score: {ideaData.analysis.marketPotential.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{ideaData.analysis.marketPotential.details}</p>
                
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
                      {ideaData.analysis.marketPotential.opportunities.map((item: string, index: number) => (
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
                      {ideaData.analysis.marketPotential.challenges.map((item: string, index: number) => (
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
                <CardDescription>Score: {ideaData.analysis.competitionAnalysis.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{ideaData.analysis.competitionAnalysis.details}</p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Estimated Market Share</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={Object.keys(competitionData[0])
                              .filter(key => key !== 'name')
                              .map(key => ({ 
                                name: key, 
                                value: competitionData[0][key] 
                              }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {Object.keys(competitionData[0])
                              .filter(key => key !== 'name')
                              .map((_, index) => (
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
                          {Object.keys(competitionData[0])
                            .filter(key => key !== 'name')
                            .map((key, index) => (
                              <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
                            ))}
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
                        {ideaData.analysis.competitionAnalysis.competitors.map((competitor: any, index: number) => (
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
                    {ideaData.analysis.competitionAnalysis.differentiators.map((item: string, index: number) => (
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
                <CardDescription>Score: {ideaData.analysis.executionComplexity.score}/100</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{ideaData.analysis.executionComplexity.details}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Technical Challenges</h4>
                    <ul className="space-y-2">
                      {ideaData.analysis.executionComplexity.technicalChallenges.map((item: string, index: number) => (
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
                      {ideaData.analysis.executionComplexity.operationalChallenges.map((item: string, index: number) => (
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
                  <p>{ideaData.analysis.executionComplexity.timeline}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="businessplan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Plan Generator</CardTitle>
                <CardDescription>Create a comprehensive business plan based on your idea analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">What's included in your business plan:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Executive Summary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Market Analysis with competitive positioning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Product/Service Description</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Marketing & Sales Strategy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Financial Projections (3-year forecast)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Implementation Roadmap</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Business Plan Format</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="pdf" name="format" defaultChecked />
                        <label htmlFor="pdf">PDF Document</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="docx" name="format" />
                        <label htmlFor="docx">Word Document</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="ppt" name="format" />
                        <label htmlFor="ppt">Presentation</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="excel" name="format" />
                        <label htmlFor="excel">Excel Financials</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Customization Options</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="investor" defaultChecked />
                        <label htmlFor="investor">Investor-ready</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="executive" />
                        <label htmlFor="executive">Include executive summary only</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="detailed" defaultChecked />
                        <label htmlFor="detailed">Include detailed financials</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleGenerateBusinessPlan}
                  disabled={isGeneratingPlan}
                >
                  {isGeneratingPlan ? "Generating Business Plan..." : "Generate Business Plan"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IdeaResults;
