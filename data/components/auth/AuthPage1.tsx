"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { Label } from "@/components/ui/label";
import GoogleSignInButton from "@/components/GoogleSignInButton";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const AuthPage1 = ({ type="login" }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Valid email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (!isLogin) {
      if (!name.trim()) newErrors.name = "Name is required";
      if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          username:email,
          password,
          redirect: false,
        });
        if (result?.error) throw new Error(result.error);
        toast.success("Login successful");
        router.push("/dashboard");
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast("Unknown Error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const isLogin = type === "login";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen max-w-7xl mx-auto">
      {/* Left Panel */}
      <div className="flex col-span-1 max-w-md mx-auto justify-center items-center -mt-8">
        <div className="w-full max-w-md">
          <div className="p-2 mr-4">
            <Logo />
          </div>
          <h2 className="text-lg md:text-2xl leading-9 tracking-tight font-bold mt-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? isLogin
                    ? "Signing In..."
                    : "Creating Account..."
                  : isLogin
                    ? "Sign In"
                    : "Sign Up"}
              </Button>
            </form>
            <p className="text-center text-sm my-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                href={isLogin ? "/signup" : "/login"}
                className="text-primary underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Link>
            </p>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleSignInButton />
            <p className="text-xs text-center text-muted-foreground mt-4">
              By clicking on {isLogin ? "sign in" : "sign up"}, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-[90%] md:w-full mx-auto bg-neutral-50 dark:bg-black justify-center items-center p-10">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h2 className="text-xl font-semibold mb-2">name</h2>
          <p className="text-muted-foreground">description</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage1;
