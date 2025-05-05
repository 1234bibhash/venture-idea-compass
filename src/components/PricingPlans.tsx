
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useSubscription, setPremiumStatus } from '@/hooks/useSubscription';
import { toast } from "sonner";

const PricingPlans: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { isPremium } = useSubscription();
  
  const handleUpgradeToPremium = () => {
    if (!isSignedIn || !user) {
      toast.error("Please sign in to upgrade to premium");
      return;
    }
    
    // In a real application, this would redirect to a payment page
    // For this demo, we'll simulate upgrading to premium
    setPremiumStatus(user.id, true);
    toast.success("Successfully upgraded to Premium! You now have unlimited idea validations.");
    
    // Force page refresh to update subscription status
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  
  const handleCancelPremium = () => {
    if (!isSignedIn || !user) return;
    
    // In a real application, this would cancel the subscription
    // For this demo, we'll just remove the premium status
    setPremiumStatus(user.id, false);
    toast.success("Premium subscription canceled. You are now on the free plan.");
    
    // Force page refresh to update subscription status
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Free Plan */}
      <Card className={`border-2 ${!isPremium ? 'border-primary' : 'border-gray-200'} shadow-md hover:shadow-lg transition-shadow`}>
        <CardHeader className="text-center">
          {!isPremium && (
            <div className="bg-primary text-white py-1 px-3 rounded-full text-sm font-medium inline-block mb-2">
              CURRENT PLAN
            </div>
          )}
          <CardTitle className="text-2xl">Free</CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-gray-500 ml-2">/forever</span>
          </div>
          <CardDescription className="mt-2">Perfect for trying out the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>2 idea validations</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Basic business plan download</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Market analysis</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Competition analysis</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link to={isSignedIn ? "/validate-idea" : "/signup"}>
              {isSignedIn ? "Start Now" : "Sign Up Free"}
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Premium Plan */}
      <Card className={`border-2 ${isPremium ? 'border-primary' : 'border-gray-200'} shadow-md hover:shadow-lg transition-shadow`}>
        <CardHeader className="text-center">
          {!isPremium && (
            <div className="bg-primary text-white py-1 px-3 rounded-full text-sm font-medium inline-block mb-2">
              RECOMMENDED
            </div>
          )}
          {isPremium && (
            <div className="bg-primary text-white py-1 px-3 rounded-full text-sm font-medium inline-block mb-2">
              CURRENT PLAN
            </div>
          )}
          <CardTitle className="text-2xl">Premium</CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold">$9</span>
            <span className="text-gray-500 ml-2">/month</span>
          </div>
          <CardDescription className="mt-2">For entrepreneurs and startups</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span><strong>Unlimited</strong> idea validations</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Complete business plan download</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>In-depth market analysis</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Advanced competitor insights</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Implementation roadmap</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Access to all future features</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          {isPremium ? (
            <Button variant="outline" className="w-full" onClick={handleCancelPremium}>
              Cancel Subscription
            </Button>
          ) : (
            <Button className="w-full" onClick={handleUpgradeToPremium}>
              {isSignedIn ? "Upgrade to Premium" : "Get Premium"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingPlans;
