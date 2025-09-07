
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/Investments";
import ITRAutofill from "./pages/ITRAutofill";
import TaxInsights from "./pages/TaxInsights";
import AIAssistant from "./pages/AIAssistant";
import TaxPlanning from "./pages/TaxPlanning";
import AddInvestment from "./pages/AddInvestment";
import ViewReport from "./pages/ViewReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/*" element={
            <SidebarProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/itr-autofill" element={<ITRAutofill />} />
                <Route path="/tax-insights" element={<TaxInsights />} />
                <Route path="/tax-planning" element={<TaxPlanning />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/add-investment" element={<AddInvestment />} />
                <Route path="/view-report" element={<ViewReport />} />
              </Routes>
            </SidebarProvider>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
