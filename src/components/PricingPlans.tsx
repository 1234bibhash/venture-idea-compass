
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const PricingPlans: React.FC = () => {
  const { isSignedIn } = useUser();
  
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Free Plan */}
      <Card className="border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
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
          <Button asChild className="w-full">
            <Link to={isSignedIn ? "/validate-idea" : "/signup"}>
              {isSignedIn ? "Start Now" : "Sign Up Free"}
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Premium Plan */}
      <Card className="border-2 border-primary shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="bg-primary text-white py-1 px-3 rounded-full text-sm font-medium inline-block mb-2">
            RECOMMENDED
          </div>
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
          <Button asChild variant="default" className="w-full">
            <Link to={isSignedIn ? "/validate-idea" : "/signup"}>
              {isSignedIn ? "Upgrade Now" : "Get Premium"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingPlans;
