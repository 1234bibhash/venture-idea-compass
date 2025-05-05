
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingPlans from '@/components/PricingPlans';
import { useSubscription } from '@/hooks/useSubscription';

const Pricing: React.FC = () => {
  const { ideasGenerated, remainingIdeas, isPremium } = useSubscription();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for you and start validating your business ideas today.
            </p>
            {isPremium ? (
              <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md inline-block">
                You're currently on the Premium plan with unlimited idea validations!
              </div>
            ) : ideasGenerated > 0 ? (
              <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md inline-block">
                You've used {ideasGenerated} of your 2 free idea validations. {remainingIdeas > 0 ? `${remainingIdeas} remaining.` : 'Upgrade to Premium for unlimited validations!'}
              </div>
            ) : null}
          </div>
          <PricingPlans />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
