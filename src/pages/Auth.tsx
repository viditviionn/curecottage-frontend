import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useLoginMutation, useSignupMutation } from '@/rtk/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/rtk/slices/authSlice';
import { RootState } from '@/rtk/store';
import logoWithName from "@/assets/logo_cure_name.png";

const emailSchema = z.string().trim().email({ message: 'Invalid email address' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters' });

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    aadhar?: string;
  }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

  const loading = isLoginLoading || isSignupLoading;

  // Get redirect state from location
  const locationState = location.state as {
    from?: string;
    reserveIntent?: boolean;
    backgroundLocation?: Location;
    payload?: {
      checkIn?: string;
      checkOut?: string;
      guests?: number;
      propertyId?: string;
    };
  } | null;
  
  // Check if Auth is rendered as a full page (not in a modal)
  // If there's no backgroundLocation in state, it's a full page route
  const isFullPage = !locationState?.backgroundLocation;

  useEffect(() => {
    if (isAuthenticated) {
      // Check if we need to redirect to a specific page
      if (locationState?.reserveIntent && locationState?.payload?.propertyId) {
        // Redirect to reserve page with the payload
        navigate(`/health-home/${locationState.payload.propertyId}`, {
          state: {
            checkIn: locationState.payload.checkIn,
            checkOut: locationState.payload.checkOut,
            guests: locationState.payload.guests,
          },
        });
      } else if (locationState?.from) {
        // Redirect to the page user came from
        navigate(locationState.from);
      } else {
        // Default redirect to home
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, locationState]);

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      aadhar?: string;
    } = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be 10 digits';
      }
      if (aadhar && !/^\d{12}$/.test(aadhar)) {
        newErrors.aadhar = 'Aadhar must be 12 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLogin) {
        const result = await login({ email: email.trim(), password }).unwrap();

        if (result.success) {
          dispatch(
            setCredentials({
              user: result.data.user,
              token: result.data.token,
            })
          );
          toast({
            title: 'Welcome back!',
            description: result.message || 'You have successfully logged in.',
          });
          // Redirect logic is handled in useEffect when isAuthenticated changes
        }
      } else {
        const result = await signup({
          email: email.trim(),
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phoneNumber,
          dateOfBirth,
          aadhar,
        }).unwrap();

        if (result.success) {
          toast({
            title: 'Account created!',
            description: result.message || 'Your account has been created successfully. Please login.',
          });
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
          setFirstName('');
          setLastName('');
          setPhoneNumber('');
          setDateOfBirth('');
          setAadhar('');
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
      toast({
        title: isLogin ? 'Login failed' : 'Sign up failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={`${isFullPage ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50' : 'bg-transparent'} flex items-center justify-center ${isFullPage ? 'p-4' : 'min-h-full w-full'}`}>
      <div className="w-full max-w-md relative">
        <Card className="border-border/50 shadow-lg max-h-[70vh] overflow-y-auto pr-2 bg-card relative">
          {/* Close button - positioned inside Card for modal mode */}
          {!isFullPage && (
            <button
              onClick={() => navigate(-1)}
              className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-between mb-4">
              {/* Back Button */}
              <Button
                onClick={() => navigate(-1)}
                className="h-9 text-sm px-4 flex items-center gap-2"
                style={{
                  backgroundColor: 'hsl(176.84deg 50.26% 37.06%)',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(42.69deg 77.34% 44.61%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(176.84deg 50.26% 37.06%)';
                }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Button>
              <div className="flex items-center justify-center gap-2 flex-1">
                <Link
                  to="/"
                  className="flex items-center space-x-2 flex-shrink-0 ml-0 lg:-ml-2 group transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={logoWithName}
                    alt="QureHome"
                    className="h-12 w-auto transition-opacity duration-200 group-hover:opacity-90"
                  />
                </Link>
              </div>
              <div className="w-[100px]"></div>
            </div>
            <CardTitle className="text-2xl">{isLogin ? 'Welcome back' : 'Create an account'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Sign in to access your health home bookings' : 'Sign up to start finding your perfect health home'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={errors.firstName ? 'border-destructive' : ''}
                        disabled={loading}
                      />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={errors.lastName ? 'border-destructive' : ''}
                        disabled={loading}
                      />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={errors.phoneNumber ? 'border-destructive' : ''}
                        disabled={loading}
                      />
                      {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                    disabled={loading}
                  />
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
          </CardContent>
        </Card>

       
      </div>
    </div>
  );
};

export default Auth;
