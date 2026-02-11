import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ReserveBooking from "./pages/ReserveBooking";
import ScrollToTop from "./components/ScrollToTop";
import AuthModal from "./pages/AuthModel";

const queryClient = new QueryClient();

/** ✅ Modal routing wrapper */
function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  // if we came from a page and opened /auth as modal,
  // backgroundLocation will exist
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      {/* ✅ Background routes (render normally) */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Index />} />
        <Route path="/browse" element={<HealthHomes />} />
        <Route path="/health-homes" element={<HealthHomes />} />
        <Route path="/health-home/:id" element={<HealthHomeDetails />} />
        <Route path="/home-conversion" element={<HomeConversion />} />
        <Route path="/home-conversion/:id" element={<HomeConversionDetails />} />
        <Route path="/become-provider" element={<BecomeProvider />} />

        {/* ✅ direct /auth open => full page */}
        <Route path="/auth" element={<Auth />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/reserve/:id" element={<ReserveBooking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ Modal routes (only when backgroundLocation exists) */}
      {backgroundLocation && (
        <Routes>
          <Route path="/auth" element={<AuthModal />} />
        </Routes>
      )}
    </>
  );
}

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HealthCheck />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;