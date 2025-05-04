"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2, Check, Mail } from 'lucide-react'
import { toast } from 'sonner'

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
          console.log(data,"data");
      
          if (!res.ok) {
            throw new Error(data?.error || "Unknown error");
          }
      
          toast.success("Subscribed!", {
            description: "You're now on the list.",
          });
      
          setIsSuccess(true);
          setEmail("");
          setTimeout(() => setIsSuccess(false), 3000);
        } catch (err: any) {
          toast.error("Oops!", {
            description: err.message || "Failed to subscribe.",
          });
        } finally {
          setIsSubmitting(false);
        }
      };
      

    return (
        <div className="max-w-5xl mx-auto text-center mb-20 border rounded-xl px-4 py-8 h-auto md:h-80 grid grid-cols-1 md:grid-cols-2 items-center gap-8 border-white/10 bg-black/10 backdrop-blur-md">
            <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-8">
                    Subscribe to our newsletter for the latest updates and exclusive offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className={`bg-white/80 border-white/10 dark:bg-black/50 ${
                                error ? "border-red-500" : ""
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1 text-left">{error}</p>
                        )}
                    </div>
                    <Button 
                        onClick={handleSubmit}
                        className="group"
                        disabled={isSubmitting || isSuccess}
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isSuccess ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <>
                                Subscribe
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <div className="animate-fade-in">
                <NewsletterPreview />
            </div>
        </div>
    )
}

export default NewsLetter

const NewsletterPreview = () => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="h-64 w-full md:w-80 bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="w-3/4 h-4 bg-white/20 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-white/20 rounded mb-4"></div>
                <div className="w-5/6 h-3 bg-white/10 rounded mb-2"></div>
                <div className="w-5/6 h-3 bg-white/10 rounded mb-2"></div>
                <div className="w-4/6 h-3 bg-white/10 rounded mb-4"></div>
                <div className="w-1/3 h-6 bg-primary/30 rounded"></div>
            </div>
        </div>
    )
}