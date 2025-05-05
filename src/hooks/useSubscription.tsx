
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

interface SubscriptionData {
  isPremium: boolean;
  ideasLimit: number;
  ideasGenerated: number;
  remainingIdeas: number;
  canGenerateMore: boolean;
}

export const useSubscription = (): SubscriptionData => {
  const { isSignedIn, user } = useUser();
  
  // In a real app, this would come from your database
  // For this demo, we'll use localStorage to track usage
  const [ideasGenerated, setIdeasGenerated] = useState<number>(0);
  
  useEffect(() => {
    if (!isSignedIn || !user) return;
    
    const userId = user.id;
    const storedValue = localStorage.getItem(`ventureCompass_ideasGenerated_${userId}`);
    if (storedValue) {
      setIdeasGenerated(parseInt(storedValue, 10));
    }
  }, [isSignedIn, user]);
  
  // Check if user has premium subscription (in a real app, check against your database)
  // For demo purposes, let's check a flag in localStorage
  const isPremium = isSignedIn && localStorage.getItem(`ventureCompass_isPremium_${user?.id}`) === 'true';
  const ideasLimit = isPremium ? Infinity : 2; // Free tier: 2, Premium: unlimited
  
  const remainingIdeas = Math.max(0, ideasLimit - ideasGenerated);
  const canGenerateMore = isPremium || remainingIdeas > 0;
  
  return {
    isPremium,
    ideasLimit: isPremium ? -1 : ideasLimit, // -1 indicates unlimited
    ideasGenerated,
    remainingIdeas: isPremium ? -1 : remainingIdeas, // -1 indicates unlimited
    canGenerateMore,
  };
};

export const incrementIdeasGenerated = (userId: string): number => {
  const key = `ventureCompass_ideasGenerated_${userId}`;
  const currentValue = parseInt(localStorage.getItem(key) || '0', 10);
  const newValue = currentValue + 1;
  localStorage.setItem(key, newValue.toString());
  return newValue;
};

export const setPremiumStatus = (userId: string, isPremium: boolean): void => {
  localStorage.setItem(`ventureCompass_isPremium_${userId}`, isPremium.toString());
};

