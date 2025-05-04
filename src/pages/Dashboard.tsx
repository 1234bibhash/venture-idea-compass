
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  
  // Mock user data - in a real app this would come from your database
  const userData = {
    plan: "free",
    ideasGenerated: 1,
    ideasLimit: 2,
    ideaHistory: [
      { title: "Mobile App for Local Service Booking", date: "2023-05-01", score: 82 }
    ]
  };
  
  const isPremium = userData.plan === "premium";
  const usagePercentage = isPremium ? 0 : (userData.ideasGenerated / userData.ideasLimit) * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || 'there'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your account and track your idea validations
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Plan Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Plan</CardTitle>
                <CardDescription>
                  {isPremium ? "Premium Plan" : "Free Plan"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isPremium && (
                  <>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Ideas Used</span>
                      <span>{userData.ideasGenerated} of {userData.ideasLimit}</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2 mb-4" />
                    <Button asChild className="w-full mt-2">
                      <Link to="/pricing">Upgrade to Premium</Link>
                    </Button>
                  </>
                )}
                {isPremium && (
                  <div className="text-center py-2">
                    <p className="text-green-600 font-medium mb-4">
                      You have unlimited idea validations!
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/validate-idea">New Idea Validation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full">
                  <Link to="/validate-idea">Validate New Idea</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{user?.emailAddresses[0]?.emailAddress}</span>
                  </div>
                  <div>
                    <span className="font-medium">Member Since:</span>
                    <span className="ml-2">{new Date(user?.createdAt || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Ideas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Recent Ideas</h2>
            {userData.ideaHistory.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Idea
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.ideaHistory.map((idea, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{idea.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{idea.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {idea.score}/100
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary hover:text-primary-dark">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500 mb-4">You haven't validated any ideas yet.</p>
                  <Button asChild>
                    <Link to="/validate-idea">Validate Your First Idea</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
