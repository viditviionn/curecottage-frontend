import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/rtk/store";
import HealthCheck from "@/components/HealthCheck";
import Index from "./pages/Index";
import BecomeProvider from "./pages/BecomeProvider";
import HealthHomes from "./pages/HealthHomes";
import HealthHomeDetails from "./pages/HealthHomeDetails";
import HomeConversion from "./pages/HomeConversion";
import HomeConversionDetails from "./pages/HomeConversionDetails";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HealthCheck />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<HealthHomes />} />
            <Route path="/health-homes" element={<HealthHomes />} />
            <Route path="/health-home/:id" element={<HealthHomeDetails />} />
            <Route path="/home-conversion" element={<HomeConversion />} />
            <Route path="/home-conversion/:id" element={<HomeConversionDetails />} />
            <Route path="/become-provider" element={<BecomeProvider />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
