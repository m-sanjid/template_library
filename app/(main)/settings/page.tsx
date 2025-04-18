"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  const [formData, setFormData] = useState({
    language: settings?.language,
    theme: settings?.theme,
    emailNotifications: {
      newTemplates: settings?.emailNotifications.newTemplates,
      updates: settings?.emailNotifications.updates,
      marketing: settings?.emailNotifications.marketing
    },
    pushNotifications: {
      browser: settings?.pushNotifications.browser,
      mobile: settings?.pushNotifications.mobile
    }
  });

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
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
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
    const value = formData.theme;
    const newTheme = value === "dark" ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const handlePreferencesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePreferences({
        language: formData.language ?? '',
        theme: formData.theme ?? '',
        emailNotifications: {
          newTemplates: formData.emailNotifications.newTemplates ?? false,
          updates: formData.emailNotifications.updates ?? false,
          marketing: formData.emailNotifications.marketing ?? false
        },
        pushNotifications: {
          browser: formData.pushNotifications.browser ?? false,
          mobile: formData.pushNotifications.mobile ?? false
        }
      });
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update preferences');
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsSubmitting(true);
    try {
      await deleteAccount();
      toast.success("Account deleted successfully");
      // Redirect to home page or handle logout
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-20">
        <SectionHeader label="Settings" title="Settings" description="Manage your account settings and preferences" gradientText="Settings" textHeight={160}/>
        <div className="flex flex-col gap-4 justify-center min-h-screen">
          <div className="w-full h-[5rem] bg-card rounded-lg p-4">
          <Skeleton className="w-full h-full"/>
          </div>
          <div className="w-full h-[20rem] bg-card rounded-lg p-4">
          <Skeleton className="w-full h-full"/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <SectionHeader label="Settings" title="Settings" description="Manage your account settings and preferences" gradientText="Settings" textHeight={160}/>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-20">
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
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      defaultValue={settings?.company}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      defaultValue={settings?.role}
                    />
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
                    <Label htmlFor="language">Language</Label>
                    <Select
                      name="language"
                      defaultValue={settings?.language}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Other Languages coming soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      name="theme"
                      defaultValue={settings?.theme}
                      onValueChange={toggleTheme}
                      value={formData.theme}
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
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newTemplates" className="text-sm font-normal">New Templates</Label>
                          <Switch
                            id="newTemplates"
                            checked={settings?.emailNotifications?.newTemplates ?? false}
                            onCheckedChange={(checked) => setFormData(prev => ({
                              ...prev,
                              emailNotifications: {
                                ...prev.emailNotifications,
                                newTemplates: checked
                              }
                            }))}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="updates" className="text-sm font-normal">Updates</Label>
                          <Switch
                            id="updates"
                            checked={settings?.emailNotifications?.updates ?? false}
                            onCheckedChange={(checked) => setFormData(prev => ({
                              ...prev,
                              emailNotifications: {
                                ...prev.emailNotifications,
                                updates: checked
                              }
                            }))}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing" className="text-sm font-normal">Marketing</Label>
                          <Switch
                            id="marketing"
                            checked={settings?.emailNotifications?.marketing ?? false}
                            onCheckedChange={(checked) => setFormData(prev => ({
                              ...prev,
                              emailNotifications: {
                                ...prev.emailNotifications,
                                marketing: checked
                              }
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Push Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="browser" className="text-sm font-normal">Browser</Label>
                          <Switch
                            id="browser"
                            checked={settings?.pushNotifications?.browser ?? false}
                            onCheckedChange={(checked) => setFormData(prev => ({
                              ...prev,
                              pushNotifications: {
                                ...prev.pushNotifications,
                                browser: checked
                              }
                            }))}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="mobile" className="text-sm font-normal">Mobile</Label>
                          <Switch
                            id="mobile"
                            checked={settings?.pushNotifications?.mobile ?? false}
                            onCheckedChange={(checked) => setFormData(prev => ({
                              ...prev,
                              pushNotifications: {
                                ...prev.pushNotifications,
                                mobile: checked
                              }
                            }))}
                          />
                        </div>
                      </div>
                    </div>
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
                  <p className="text-sm text-muted-foreground">
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
                      <h3 className="font-semibold">{subscription.plan} Plan</h3>
                      <div className="text-sm text-muted-foreground">
                        {subscription.status === "active" ? (
                          <Badge variant="secondary">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => window.location.href = "/pricing"}>
                      Change Plan
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Payment method</span>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>•••• 4242</span>
                      </div>
                    </div>
                  </div>

                  {subscription.status === "active" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (confirm("Are you sure you want to cancel your subscription?")) {
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
                    <h3 className="font-semibold mb-2">No Active Subscription</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upgrade to access premium features and templates
                    </p>
                    <Button onClick={() => window.location.href = "/pricing"}>
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