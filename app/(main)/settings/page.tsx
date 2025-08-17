"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const {
    settings,
    isLoading,
    updateProfile,
    updatePreferences,
    updatePassword,
    deleteAccount,
  } = useSettings();
  const { subscription, isLoading: subscriptionLoading } = useSubscription();
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      role: formData.get("role") as string,
    };

    try {
      await updateProfile(data);
      toast.success("Profile updated successfully");
      setError(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme =
      localStorage.getItem("theme") ||
      (root.classList.contains("dark") ? "dark" : "light");
    setIsDarkMode(currentTheme === "dark");
    root.classList.toggle("dark", currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handlePreferencesSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePreferences({
        theme: isDarkMode ? "dark" : "light",
      });
      toast.success("Preferences updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    try {
      await updatePassword(currentPassword, newPassword);
      toast.success("Password updated successfully");
      e.currentTarget.reset();
      setError(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await deleteAccount();
      toast.success("Account deleted successfully");
      setError(null);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-20">
        <SectionHeader
          label="Settings"
          title="Settings"
          description="Manage your account settings and preferences"
          gradientText="Settings"
          textHeight={160}
        />
        <div className="mt-20 flex min-h-screen flex-col gap-4">
          <div className="bg-card h-[5rem] w-full rounded-lg p-4">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="bg-card h-[20rem] w-full rounded-lg p-4">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        label="Settings"
        title="Settings"
        description="Manage your account settings and preferences"
        gradientText="Settings"
        textHeight={160}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-20 grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={settings?.name}
                      required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={settings?.email}
                      required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePreferencesSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      name="theme"
                      defaultValue={settings?.theme}
                      onValueChange={toggleTheme}
                      value={settings?.theme}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>

              <Separator className="my-8" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Delete Account</h3>
                  <p className="text-muted-foreground text-sm">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              {subscriptionLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : subscription ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {subscription.plan} Plan
                      </h3>
                      <div className="text-muted-foreground text-sm">
                        {subscription.status === "active" ? (
                          <Badge variant="secondary">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = "/pricing")}
                    >
                      Change Plan
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Next billing date
                      </span>
                      <span>
                        {new Date(
                          subscription.currentPeriodEnd,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Payment method
                      </span>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>•••• 4242</span>
                      </div>
                    </div>
                  </div>

                  {subscription.status === "active" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to cancel your subscription?",
                          )
                        ) {
                          window.location.href = "/pricing";
                        }
                      }}
                    >
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="mb-2 font-semibold">
                      No Active Subscription
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Upgrade to access premium features and templates
                    </p>
                    <Button onClick={() => (window.location.href = "/pricing")}>
                      View Plans
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
