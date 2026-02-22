import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-primary leading-tight">QureHome</h1>
                <p className="text-xs text-muted-foreground">Heal faster. Save more. Feel at home.</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
          <Link to="/" className="text-primary hover:text-primary/80 underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
