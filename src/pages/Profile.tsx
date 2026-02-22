import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Briefcase, Users, MessageSquare, Edit, Building, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUpdateUserMutation, useUserProfileQuery } from '@/rtk/api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/rtk/store';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PropertyDetails, useGetMyPropertiesQuery } from '@/rtk/api/showproperty';
import { User as UserType } from '@/rtk/api/authApi';

type ProfileTab = "about" | "property";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  // Check if we should open property tab from navigation state
  const initialTab = (location.state as { activeTab?: ProfileTab })?.activeTab ?? 'about';
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);

  // Update tab if location state changes
  useEffect(() => {
    const tabFromState = (location.state as { activeTab?: ProfileTab })?.activeTab;
    if (tabFromState) {
      setActiveTab(tabFromState);
    }
  }, [location.state]);

  const { user: storeUser } = useSelector((state: RootState) => state.auth) as { user: UserType };
  const { data: profileUser, isLoading, error } = useUserProfileQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const user = profileUser || storeUser;
  const isHost = user?.role === "host";
  const {
    data: myPropsData,
    isLoading: myPropsLoading,
    isError: myPropsError,
    refetch: refetchMyProps,
  } = useGetMyPropertiesQuery(
    { page: 1, limit: 100 },
    { skip: activeTab !== "property" || !isHost }
  );

  const myProperties = myPropsData?.properties ?? [];

  const getCardImage = (p: PropertyDetails) =>
    p.images?.find((img) => img.isPrimary)?.imageUrl;


  useEffect(() => {
    if (!isHost && activeTab === "property") {
      setActiveTab("about");
    }
  }, [isHost, activeTab]);
  useEffect(() => {
    if (!user) return;

    const dob = user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
      : "";

    setEditForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      dateOfBirth: dob,
    });
  }, [user, isEditOpen]);

  const getInitials = () => {
    if (!user) return 'U';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';
  };

  const tabs = [
    { id: "about" as const, label: "About me", icon: User },
    ...(isHost ? [{ id: "property" as const, label: "Property", icon: Building }] : []),
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
  const onSave = async () => {
    try {
      const userId = user.id;

      if (!editForm.firstName.trim() || !editForm.lastName.trim()) {
        toast.error("Required", {
          description: "First name and last name are required.",
        });
        return;
      }

      const dobISO = editForm.dateOfBirth
        ? `${editForm.dateOfBirth}T00:00:00.000Z`
        : undefined;

      const res = await updateUser({
        userId,
        body: {
          firstName: editForm.firstName.trim(),
          lastName: editForm.lastName.trim(),
          ...(dobISO ? { dateOfBirth: dobISO } : {}),
        },
      }).unwrap();

      toast.success("Profile updated", {
        description: res?.message || "Updated successfully",
      });

      setIsEditOpen(false);
    } catch (err: unknown) {
      toast.error("Update failed", {
        description: err instanceof Error ? err.message : "Something went wrong",
      });
      console.error("Update failed", err);
    }
  };

  const getStatusBadgeClass = (status?: string) => {
    const s = (status || "").toLowerCase();

    if (s === "active") return "bg-green-600 text-white";
    if (s === "inactive") return "bg-red-600 text-white";
    if (s === "draft") return "bg-white/90 text-black";

    // fallback (in case some other status comes)
    return "bg-white/90 text-black";
  };

  return (
    <>
      <Header />

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal details.
            </DialogDescription>
          </DialogHeader>

          {/* Modal Body */}
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.profileImageUrl || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>First Name</Label>
                <Input
                  value={editForm.firstName}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input
                  value={editForm.lastName}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={editForm.dateOfBirth}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, dateOfBirth: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  This helps verify your identity and improves trust with hosts/guests.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isUpdating}
              onClick={async () => {
                // basic validation
                if (!editForm.firstName.trim() || !editForm.lastName.trim()) {
                  toast.error("Required", {
                    description: "First name and last name are required.",
                  });
                  return;
                }

                try {
                  const dobISO = editForm.dateOfBirth
                    ? `${editForm.dateOfBirth}T00:00:00.000Z`
                    : undefined;

                  const res = await updateUser({
                    userId: user.id,
                    body: {
                      firstName: editForm.firstName.trim(),
                      lastName: editForm.lastName.trim(),
                      ...(dobISO ? { dateOfBirth: dobISO } : {}),
                    },
                  }).unwrap();

                  toast.success("Profile updated", {
                    description: res?.message || "Updated successfully",
                  });

                  setIsEditOpen(false);
                } catch (err: unknown) {
                  toast.error("Update failed", {
                    description:
                      err instanceof Error ? err.message : "Something went wrong",
                  });
                  console.error("Update failed", err);
                }
              }}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Button
            onClick={() => navigate('/')} className="mb-4 h-9 text-sm px-4 flex items-center gap-2"
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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main */}
            <main className="flex-1">
              {activeTab === "about" && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">About me</h1>

                    {!isEditOpen ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => setIsEditOpen(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" onClick={onSave} disabled={isUpdating}>
                          {isUpdating ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    )}
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

                          {!isEditOpen ? (
                            <div>
                              <h3 className="text-xl font-bold capitalize">
                                {user.firstName} {user.lastName}
                              </h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                {user.role || "Guest"}
                              </p>
                            </div>
                          ) : (
                            <div className="w-full space-y-3 text-left">
                              <div className="space-y-1">
                                <Label>First Name</Label>
                                <Input
                                  value={editForm.firstName}
                                  onChange={(e) =>
                                    setEditForm((p) => ({
                                      ...p,
                                      firstName: e.target.value,
                                    }))
                                  }
                                />
                              </div>

                              <div className="space-y-1">
                                <Label>Last Name</Label>
                                <Input
                                  value={editForm.lastName}
                                  onChange={(e) =>
                                    setEditForm((p) => ({
                                      ...p,
                                      lastName: e.target.value,
                                    }))
                                  }
                                />
                              </div>

                              <div className="space-y-1">
                                <Label>Date of Birth</Label>
                                <Input
                                  type="date"
                                  value={editForm.dateOfBirth}
                                  onChange={(e) =>
                                    setEditForm((p) => ({
                                      ...p,
                                      dateOfBirth: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Complete Profile Section */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Complete your profile</h3>
                        <p className="text-muted-foreground mb-4">
                          Your QureHome profile is an important part of every reservation.
                          Create yours to help other hosts and guests get to know you.
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
                            <span className="text-xs text-green-600 mt-1 inline-block">
                              Verified
                            </span>
                          )}
                        </div>

                        {user.phoneNumber && (
                          <div>
                            <h4 className="font-semibold mb-2">Phone Number</h4>
                            <p className="text-muted-foreground">{user.phoneNumber}</p>
                            {user.isPhoneVerified && (
                              <span className="text-xs text-green-600 mt-1 inline-block">
                                Verified
                              </span>
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
                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeTab === "property" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">My Properties</h1>

                    <div className="flex gap-2">
                      {/* <Button variant="outline" onClick={() => refetchMyProps()}>
                        Refresh
                      </Button> */}
                      <Button onClick={() => navigate("/become-provider")}>
                        Add Property
                      </Button>
                    </div>
                  </div>

                  {myPropsLoading && (
                    <p className="text-muted-foreground">Loading your properties...</p>
                  )}

                  {myPropsError && (
                    <p className="text-red-500">Failed to load your properties</p>
                  )}

                  {!myPropsLoading && !myPropsError && myProperties.length === 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground">
                          You haven’t listed any properties yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {!myPropsLoading && !myPropsError && myProperties.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {myProperties.map((p) => (
                        <Card
                          key={p.id}
                          className="group cursor-pointer hover:shadow-xl transition-all duration-300 border overflow-hidden"

                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={getCardImage(p)}
                              alt={p.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute top-2 left-2 flex gap-2">
                              <span className="text-[10px] h-6 bg-white/90 px-2 py-1 rounded-md text-black">
                                {p.propertyType.toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-2">
                              <span
                                className={`text-[10px] h-6 px-2 py-1 rounded-md ${getStatusBadgeClass(
                                  p.status
                                )}`}
                              >
                                {(p.status || "draft").toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="font-semibold text-base line-clamp-1">
                                {p.name}
                              </h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {p.totalRooms} rooms
                              </span>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {p.addressLine1}, {p.city}
                            </p>

                            <div className='flex gap-2'>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2"
                                onClick={() => navigate(`/host/health-home/${p.id}`)}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/become-provider?edit=${p.id}`, {
                                    state: { property: p },
                                  });
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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

