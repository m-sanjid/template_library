"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Check, Mail } from "lucide-react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    setError("");
    if (!email) return setError("Email is required");
    if (!validateEmail(email)) return setError("Please enter a valid email");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(data, "data");

      if (!res.ok) {
        throw new Error(data?.error || "Unknown error");
      }

      toast.success("Subscribed!", {
        description: "You're now on the list.",
      });

      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: Error | unknown) {
      toast.error("Oops!", {
        description:
          err instanceof Error ? err.message : "Failed to subscribe.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mb-20 grid h-auto max-w-5xl grid-cols-1 items-center gap-8 rounded-xl border border-white/10 bg-black/10 px-4 py-8 text-center backdrop-blur-md md:h-80 md:grid-cols-2">
      <div className="animate-fade-in">
        <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to our newsletter for the latest updates and exclusive
          offers.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              className={`border-white/10 bg-white/80 dark:bg-black/50 ${
                error ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            {error && (
              <p className="mt-1 text-left text-sm text-red-500">{error}</p>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            className="group"
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="animate-fade-in">
        <NewsletterPreview />
      </div>
    </div>
  );
};

export default NewsLetter;

const NewsletterPreview = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 p-4 md:w-80">
        <div className="bg-primary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <div className="mb-2 h-4 w-3/4 rounded bg-white/20"></div>
        <div className="mb-4 h-4 w-1/2 rounded bg-white/20"></div>
        <div className="mb-2 h-3 w-5/6 rounded bg-white/10"></div>
        <div className="mb-2 h-3 w-5/6 rounded bg-white/10"></div>
        <div className="mb-4 h-3 w-4/6 rounded bg-white/10"></div>
        <div className="bg-primary/30 h-6 w-1/3 rounded"></div>
      </div>
    </div>
  );
};
