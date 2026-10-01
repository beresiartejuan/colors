import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Landing from "./pages/Landing";
import TemplatesGallery from "./pages/TemplatesGallery";
import TemplateShowcase from "./pages/TemplateShowcase";
import LegacyTemplateRedirect from "./pages/LegacyTemplateRedirect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/templates" component={TemplatesGallery} />
        <Route path="/templates/:templateId" component={TemplateShowcase} />
        {/* Backwards compatibility: old shareable links */}
        <Route path="/:colors" component={LegacyTemplateRedirect} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
