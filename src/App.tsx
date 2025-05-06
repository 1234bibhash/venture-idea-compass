
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import Index from "./pages/Index";
import ValidateIdea from "./pages/ValidateIdea";
import Results from "./pages/Results";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// Redirect component to handle post-login navigation
const RedirectToDashboard = () => {
  return <Navigate to="/dashboard" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={
            <>
              <SignedIn>
                <RedirectToDashboard />
              </SignedIn>
              <SignedOut>
                <SignIn routing="path" path="/login" afterSignInUrl="/dashboard" />
              </SignedOut>
            </>
          } />
          <Route path="/login/*" element={
            <>
              <SignedIn>
                <RedirectToDashboard />
              </SignedIn>
              <SignedOut>
                <SignIn routing="path" path="/login" afterSignInUrl="/dashboard" />
              </SignedOut>
            </>
          } />
          <Route path="/signup" element={
            <>
              <SignedIn>
                <RedirectToDashboard />
              </SignedIn>
              <SignedOut>
                <SignUp routing="path" path="/signup" afterSignUpUrl="/dashboard" />
              </SignedOut>
            </>
          } />
          <Route path="/signup/*" element={
            <>
              <SignedIn>
                <RedirectToDashboard />
              </SignedIn>
              <SignedOut>
                <SignUp routing="path" path="/signup" afterSignUpUrl="/dashboard" />
              </SignedOut>
            </>
          } />
          <Route path="/validate-idea" element={
            <ValidateIdea />
          } />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
