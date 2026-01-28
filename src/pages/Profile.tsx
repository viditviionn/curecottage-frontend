import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Users, MessageSquare, Edit } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfileQuery } from '@/rtk/api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/rtk/store';

type ProfileTab = 'about' | 'trips' | 'connections';

const Profile = () => {
  const navigate = useNavigate();
  const { user: storeUser } = useSelector((state: RootState) => state.auth);
  const { data: profileUser, isLoading, error } = useUserProfileQuery();
  const [activeTab, setActiveTab] = useState<ProfileTab>('about');

  // Use profile data from API if available, otherwise fall back to store user
  const user = profileUser || storeUser;

  const getInitials = () => {
    if (!user) return 'U';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';
  };

  const tabs = [
    {
      id: 'about' as ProfileTab,
      label: 'About me',
      icon: User,
    },
  ];

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Failed to load profile</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">About me</h1>
                    <Button variant="outline" size="sm" className="text-muted-foreground">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Profile Card */}
                    <Card className="w-full lg:w-auto lg:min-w-[300px]">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={user.profileImageUrl || undefined} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                              {getInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-bold capitalize">
                              {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground capitalize">
                              {user.role || 'Guest'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Complete Profile Section */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Complete your profile</h3>
                        <p className="text-muted-foreground mb-4">
                          Your Cure Cottage profile is an important part of every reservation. Create yours to help other hosts and guests get to know you.
                        </p>
                        <Button className="bg-primary hover:bg-primary/90">
                          Get started
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="mt-6">
                    <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-5 w-5" />
                      <span className="font-medium">Reviews I've written</span>
                    </button>
                  </div>

                  {/* User Details */}
                  <Card className="mt-6">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Email</h4>
                          <p className="text-muted-foreground">{user.email}</p>
                          {user.isEmailVerified && (
                            <span className="text-xs text-green-600 mt-1 inline-block">Verified</span>
                          )}
                        </div>
                        {user.phoneNumber && (
                          <div>
                            <h4 className="font-semibold mb-2">Phone Number</h4>
                            <p className="text-muted-foreground">{user.phoneNumber}</p>
                            {user.isPhoneVerified && (
                              <span className="text-xs text-green-600 mt-1 inline-block">Verified</span>
                            )}
                          </div>
                        )}
                        {user.dateOfBirth && (
                          <div>
                            <h4 className="font-semibold mb-2">Date of Birth</h4>
                            <p className="text-muted-foreground">
                              {new Date(user.dateOfBirth).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold mb-2">Member since</h4>
                          <p className="text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

