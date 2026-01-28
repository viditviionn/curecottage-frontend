import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Heart, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/rtk/store';
import { logout } from '@/rtk/slices/authSlice';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HeaderProps {
  activePage?: 'health-homes' | 'home-conversion';
}

const Header = ({ activePage = 'health-homes' }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const isHealthHomesActive = activePage === 'health-homes' || location.pathname === '/' || location.pathname === '/health-homes' || location.pathname === '/browse';
  const isHomeConversionActive = activePage === 'home-conversion' || location.pathname === '/home-conversion';

  const navLinks = [
    {
      to: '/',
      label: 'Health Homes',
      isActive: isHealthHomesActive,
    },
    {
      to: '/home-conversion',
      label: 'Home Conversion',
      isActive: isHomeConversionActive,
    },
  ];

  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-primary p-1.5 lg:p-2 rounded-lg">
              <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-2xl font-bold text-primary leading-tight">Cure Cottage</h1>
              <p className="text-[0.6rem] lg:text-xs text-muted-foreground hidden sm:block">Heal faster. Save more. Feel at home.</p>
            </div>
          </Link>

          {/* Desktop Navigation - shows on lg screens and up */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors ${
                    link.isActive
                      ? 'text-primary font-medium'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={`/become-provider?service=${activePage}`}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap"
              >
                <Heart className="h-4 w-4" />
                Be the Host
              </Link>
            </div>
          </nav>

          {/* Desktop Auth Buttons - shows on lg screens and up */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 relative">
                <div className="bg-primary/10 p-2 rounded-full cursor-pointer"
                onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
    }}>
                  <User className="h-5 w-5 text-primary" />
                </div>
                  {open && (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default"
        aria-label="Close dropdown"
        onClick={() => setOpen(false)}
      />

      {/* Dropdown */}
      <div
        className="absolute top-16 right-0 z-50 bg-white shadow-md p-4 rounded-lg min-w-[200px]"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="mb-3 pb-3 border-b">
          <span className="text-sm font-medium block capitalize">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>

        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              navigate('/profile');
              setOpen(false);
            }}
          >
            Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              dispatch(logout());
              setOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  )}
               
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile/Tablet Menu Button - shows on screens below lg */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-primary">Cure Cottage</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg py-2 px-4 rounded-lg transition-colors ${
                        link.isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to={`/become-provider?service=${activePage}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    Be the Host
                  </Link>
                  <div className="border-t border-border my-4" />
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg font-medium">{user?.firstName} {user?.lastName}</span>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="text-lg py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        Profile
                      </Link>
                      <Button 
                        className="flex items-center gap-2 text-lg py-2 px-4 rounded-lg text-foreground hover:bg-primary/20 transition-colors" 
                        size="lg"
                        variant="outline"
                        onClick={() => {
                          dispatch(logout());
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="text-lg py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button className="w-full" size="lg">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
