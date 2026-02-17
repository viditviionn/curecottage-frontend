// ✅ Header.tsx (FULL FILE)
// Place this as: src/components/Header.tsx (or your existing path)

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Heart, Menu, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/rtk/store";
import { logout } from "@/rtk/slices/authSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserProfileQuery } from "@/rtk/api/authApi";
import logoWithoutName from "@/assets/logo_cure.png";
import logoWithName from "@/assets/logo_cure_name.png";

// ✅ shadcn alert-dialog
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface HeaderProps {
  activePage?: "health-homes" | "homes";
  hideCenterNav?: boolean; // when true => center switches to search bar
  centerContent?: React.ReactNode; // the searchbar rendered in header center
}

const Header = ({
  activePage = "health-homes",
  hideCenterNav = false,
  centerContent,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false); // mobile sheet
  const [open, setOpen] = useState(false); // desktop dropdown
  const [isDocked, setIsDocked] = useState(false); // search bar docking state

  // ✅ logout modal states
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutStep, setLogoutStep] = useState<"confirm" | "success">(
    "confirm",
  );
  const [loggingOut, setLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user: storeUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const { data: profileUser } = useUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const user = profileUser || storeUser;

  const isHealthHomesActive =
    activePage === "health-homes" ||
    location.pathname === "/" ||
    location.pathname === "/health-homes" ||
    location.pathname === "/browse";

  const isHomesActive = activePage === "homes" || location.pathname === "/homes";

  const navLinks = [
    { to: "/homes", label: "Homes", isActive: isHomesActive },
  ];

  const closeTimer = React.useRef<number | null>(null);

  const openDropdown = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeDropdown = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  // ✅ open confirm modal
  const requestLogout = () => {
    setOpen(false); // close desktop dropdown
    setIsOpen(false); // close mobile sheet
    setLogoutStep("confirm");
    setLogoutModalOpen(true);
  };

  // ✅ confirm logout + show tick
  const confirmLogout = async () => {
    try {
      setLoggingOut(true);

      // If you have an API logout call, await it here.
      dispatch(logout());

      setLogoutStep("success");

      // show tick then redirect
      window.setTimeout(() => {
        setLogoutModalOpen(false);
        // Navigate to home and force a full reload so app state resets
        window.location.href = "/";
      }, 900);
    } finally {
      setLoggingOut(false);
    }
  };

  // Listen to search dock event from SearchBar
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail?.docked) {
        setIsDocked(!!e.detail?.docked);
      } else {
        // Undock after short delay to allow SearchBar to animate out
        setTimeout(() => setIsDocked(false), -0);
      }
    };

    window.addEventListener("cc:searchDock", handler as EventListener);
    return () =>
      window.removeEventListener("cc:searchDock", handler as EventListener);
  }, []);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  return (
    <>
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-lg sticky top-0 z-[9999] shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 flex-shrink-0 ml-0 lg:-ml-2 group transition-transform duration-200 hover:scale-105"
            >
              <img
                src={logoWithName}
                alt="QureHome"
                className="h-16 w-auto transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            {/* ✅ Desktop Center Area (Nav OR Searchbar like Airbnb) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-2 relative h-[64px]">
              {/* Nav Links - fade out when docked */}
              <nav
                className={[
                  "absolute inset-0 flex items-center justify-center space-x-8 transform-gpu will-change-[opacity,transform] transition-all duration-500 ease-out",
                  isDocked && centerContent
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100 pointer-events-auto",
                ].join(" ")}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`transition-all duration-300 relative group ${
                      link.isActive
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    } ${link.label === "Homes" && isDocked ? "hidden" : ""}`}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      {link.isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left transition-all duration-300"></span>
                      )}
                      {!link.isActive && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      )}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* SearchBar in Header - fade in when docked */}
              {centerContent && (
                <div
                  className={[
                    "absolute inset-0 flex items-center justify-center transform-gpu will-change-[opacity,transform] transition-all duration-500 ease-out",
                    isDocked
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 translate-y-2 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="w-full max-w-[1200px]">
                    {React.isValidElement(centerContent)
                      ? React.cloneElement(centerContent, { variant: "header" })
                      : centerContent}
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Desktop Right Side (Be the Host + Auth/User always visible) */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              {/* Be the Host stays right always */}
              {/* <Link
                to={isAuthenticated ? `/become-provider?service=${activePage}` : '/auth'}
                state={!isAuthenticated ? { from: `/become-provider?service=${activePage}` } : undefined}
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/auth', { state: { from: `/become-provider?service=${activePage}` } });
                  }
                }}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap"
              >
                <Heart className="h-4 w-4" />
                Be the Host hello 1
              </Link> */}

              <Link
                to={
                  isAuthenticated
                    ? `/become-provider?service=${activePage}`
                    : "/auth"
                }
                state={
                  !isAuthenticated
                    ? {
                        backgroundLocation: location, // ✅ this makes it open as modal (SS-2)
                        from: `/become-provider?service=${activePage}`, // ✅ keep redirect
                      }
                    : undefined
                }
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-secondary-foreground transition-all duration-300 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap hover:bg-primary/10 hover:text-primary hover:scale-105 active:scale-95"
              >
                <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Be the Host
              </Link>

              {isAuthenticated ? (
                <div
                  className="relative"
                  ref={menuRef}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    type="button"
                    className="bg-primary/10 p-2 rounded-full cursor-pointer hover:bg-primary/20 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg"
                    onMouseEnter={openDropdown}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/profile");
                      setOpen(false);
                    }}
                    aria-label="User menu"
                  >
                    <User className="h-5 w-5 text-primary transition-transform duration-300" />
                  </button>

                  {open && (
                    <div
                      className="absolute top-12 right-0 z-50 bg-white shadow-lg border rounded-xl min-w-[240px] overflow-hidden"
                      onMouseEnter={openDropdown}
                    >
                      <div className="px-4 py-3 border-b bg-muted/30">
                        <p className="text-sm font-semibold capitalize leading-tight">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>

                      <div className="p-2">
                        {/* <button
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                          onClick={() => {
                            navigate("/profile");
                            setOpen(false);
                          }}
                        >
                          Profile
                        </button> */}

                        <button
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-red-600"
                          onClick={requestLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/auth" state={{ backgroundLocation: location }}>
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  {/* <Link to="/auth" state={{ backgroundLocation: location }}>
                    <Button size="sm">Get Started</Button>
                  </Link> */}
                </>
              )}
            </div>

            {/* Mobile Menu */}
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
                      <span className="text-primary">Cure Cottage hello</span>
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
                            ? "bg-primary/10 text-primary font-medium border-b-2 border-black"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <Link
                      to={
                        isAuthenticated
                          ? `/become-provider?service=${activePage}`
                          : "/auth"
                      }
                      state={
                        !isAuthenticated
                          ? { from: `/become-provider?service=${activePage}` }
                          : undefined
                      }
                      onClick={(e) => {
                        if (!isAuthenticated) {
                          e.preventDefault();
                          navigate("/auth", {
                            state: {
                              from: `/become-provider?service=${activePage}`,
                            },
                          });
                        }
                        setIsOpen(false);
                      }}
                      className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap"
                    >
                      <Heart className="h-4 w-4" />
                      Be the Host
                    </Link>

                    <div className="border-t border-border my-4" />

                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-3 px-4 py-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-lg font-medium">
                            {user?.firstName} {user?.lastName}
                          </span>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsOpen(false)}
                          className="text-lg py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                          Profile
                        </Link>

                        <Button
                          className="flex items-center gap-2 text-lg py-2 px-4 rounded-lg"
                          size="lg"
                          variant="outline"
                          onClick={requestLogout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/auth"
                          state={location}
                          className="text-lg py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link to="/auth" state={location}>
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

          {/* ✅ Mobile Center Search (optional) */}
          {/* If you want search inside header on mobile also, you can pass centerContent and render here */}
        </div>
      </header>

      {/* ✅ Logout Confirm Modal */}
      <AlertDialog
        open={logoutModalOpen}
        onOpenChange={(v) => {
          if (loggingOut) return;
          setLogoutModalOpen(v);
          if (!v) setLogoutStep("confirm");
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          {logoutStep === "confirm" ? (
            <>
              <AlertDialogHeader className="text-center">
                <AlertDialogTitle className="text-base sm:text-lg">
                  Are you sure, you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  You will be signed out from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-row gap-3 sm:gap-4 justify-center sm:justify-end">
                <AlertDialogCancel
                  className="rounded-full px-6"
                  disabled={loggingOut}
                >
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={(e) => {
                    e.preventDefault();
                    confirmLogout();
                  }}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <p className="text-base font-semibold">Logged out successfully</p>
              <p className="text-sm text-muted-foreground">Redirecting…</p>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Header;
