
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSubscription, incrementIdeasGenerated } from '@/hooks/useSubscription';

const IdeaValidationForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { canGenerateMore, isPremium, remainingIdeas } = useSubscription();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetMarket: '',
    industry: '',
    revenue: '',
    uniqueValue: '',
    isSubmitting: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.industry) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Check if user can generate more ideas
    if (user && !canGenerateMore) {
      toast.error("You've reached your idea validation limit. Please upgrade to Premium for unlimited validations.");
      navigate('/pricing');
      return;
    }
    
    setFormData(prev => ({ ...prev, isSubmitting: true }));
    
    // Store form data in localStorage for persistence between pages
    localStorage.setItem('ideaFormData', JSON.stringify(formData));
    
    // Increment idea count if user is signed in
    if (user) {
      incrementIdeasGenerated(user.id);
    }
    
    // Navigate to results page with form data
    setTimeout(() => {
      navigate('/results', { state: { formData } });
    }, 1000);
  };
  
  const industries = [
    "Technology", "Healthcare", "Finance", "Education", 
    "E-commerce", "Food & Beverage", "Travel", "Real Estate",
    "Entertainment", "Fashion", "Logistics", "Software", 
    "AI/Machine Learning", "Gaming", "Hardware", "Other"
  ];

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Validate Your Startup Idea</CardTitle>
          <CardDescription>
            Fill in the details below to get a comprehensive analysis of your idea's potential
          </CardDescription>
        </CardHeader>
        
        <SignedIn>
          {!isPremium && (
            <div className="px-6">
              <Alert className="mb-6">
                <AlertDescription>
                  {remainingIdeas > 0 ? (
                    <span>
                      You have <strong>{remainingIdeas}</strong> idea validation{remainingIdeas !== 1 ? 's' : ''} remaining on your free plan.{' '}
                      <Link to="/pricing" className="text-primary underline font-medium">
                        Upgrade to Premium
                      </Link>{' '}
                      for unlimited validations.
                    </span>
                  ) : (
                    <span>
                      You've reached your idea validation limit.{' '}
                      <Link to="/pricing" className="text-primary underline font-medium">
                        Upgrade to Premium
                      </Link>{' '}
                      for unlimited validations.
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </SignedIn>
        
        <SignedOut>
          <div className="px-6">
            <Alert className="mb-6">
              <AlertDescription>
                <span>
                  <Link to="/signup" className="text-primary underline font-medium">Sign up</Link> or{' '}
                  <Link to="/login" className="text-primary underline font-medium">log in</Link>{' '}
                  to save your results and unlock more validations.
                </span>
              </AlertDescription>
            </Alert>
          </div>
        </SignedOut>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Idea Title *</Label>
              <Input 
                id="title" 
                name="title"
                placeholder="E.g., Mobile App for Local Service Booking" 
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Idea Description *</Label>
              <Textarea 
                id="description" 
                name="description"
                placeholder="Describe your idea in detail. What problem does it solve? How does it work?" 
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select 
                value={formData.industry} 
                onValueChange={(value) => handleSelectChange("industry", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target Market</Label>
              <Input 
                id="targetMarket" 
                name="targetMarket"
                placeholder="E.g., Small business owners, Millennials in urban areas" 
                value={formData.targetMarket}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue Model</Label>
              <Input 
                id="revenue" 
                name="revenue"
                placeholder="E.g., Subscription, Freemium, One-time purchase" 
                value={formData.revenue}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
              <Textarea 
                id="uniqueValue" 
                name="uniqueValue"
                placeholder="What makes your idea different from existing solutions?" 
                rows={3}
                value={formData.uniqueValue}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={formData.isSubmitting || (user && !canGenerateMore)}
            >
              {formData.isSubmitting ? "Analyzing..." : "Validate My Idea"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default IdeaValidationForm;
