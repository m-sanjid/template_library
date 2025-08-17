import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useSubscription } from "./use-subscription";

interface UserSettings {
  name: string;
  email: string;
  theme?: string;
}

export function useSettings() {
  const { data: session, update } = useSession();
  const { subscription, isLoading: subscriptionLoading } = useSubscription();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/settings");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch settings");
        }

        setSettings(data.settings);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchSettings();
    } else {
      setSettings(null);
      setIsLoading(false);
    }
  }, [session]);

  const updateProfile = async (data: Partial<UserSettings>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings.settings);
      await update();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (data: Partial<UserSettings>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/settings/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings.settings);
      toast.success("Preferences updated successfully");
    } catch (err) {
      console.error("Error updating preferences:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to update preferences");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/settings/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      toast.success("Password updated successfully");
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to update password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/settings/account", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      toast.success("Account deleted successfully");
      window.location.href = "/";
    } catch (err) {
      console.error("Error deleting account:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to delete account");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    settings,
    subscription,
    isLoading: isLoading || subscriptionLoading,
    error,
    updateProfile,
    updatePreferences,
    updatePassword,
    deleteAccount,
  };
}
